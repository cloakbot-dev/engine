import {NodeData} from './classes/Node';
/* eslint-disable new-cap */
import {instanceToPlain, Transform, Exclude} from 'class-transformer';
import {plainToInstance} from 'class-transformer';
import {type Connection} from '../types';
import {v4} from 'uuid';
import _ from 'lodash';
import {NodeWrapper} from './classes/NodeWrapper';
import {type Attribute} from './classes/Attribute';
import {type Value} from './classes/Value';

export type ExecutionContext = {
	engine: Engine;
	values: Record<string, Record<string, Value<any>>>;
	set(name: string, value: Value<any>): void;
	get<T = any>(name: string): Value<T>;
	execute(path: string): void;
};

export type EngineEvents = {
	'node-added': (id: string) => void;
	'node-removed': (id: string) => void;
	'changed': () => void;
};

export class Engine {
	static load(string: string) {
		const e = plainToInstance(Engine, JSON.parse(string), {
			enableImplicitConversion: true,
		});
		return e;
	}

	@Transform(value => {
		const map = new Map<string, NodeWrapper>();
		for (const entry of Object.entries(value.value)) {
			(entry[1] as any).data = plainToInstance(NodeData, (entry[1] as any).data, {
				enableImplicitConversion: true,
			});

			console.log((entry[1] as {id: string}).id, entry[0]);

			map.set(entry[0], new NodeWrapper(entry[1] as any));
		}

		return map;
	}, {toClassOnly: true}) nodes = new Map<string, NodeWrapper>();

	@Exclude() listeners = new Map<keyof EngineEvents, Array<EngineEvents[keyof EngineEvents]>>();

	connections: Connection[] = [];

	on<E extends keyof EngineEvents>(event: E, l: EngineEvents[E]) {
		this.listeners.set(event, [...(this.listeners.get(event) ?? []), l]);
	}

	off<E extends keyof EngineEvents>(event: E, l: EngineEvents[E]) {
		this.listeners.set(event, (this.listeners.get(event) ?? []).filter(listener => listener !== l));
	}

	emit<E extends keyof EngineEvents>(event: E, ...args: Parameters<EngineEvents[E]>) {
		if (event !== 'changed') {
			this.emit('changed');
		}

		for (const l of this.listeners.get(event) ?? []) {
			(l as (...args: Parameters<EngineEvents[E]>) => any)(...args);
		}
	}

	getGetter(nodeId: string, ctx: ExecutionContext['values']) {
		return (name: string): Value<any> => {
			let value: Value<any> | undefined;
			const connection = this.connections.find(c => c.toId === nodeId && c.toPort === name);

			const targetAttribute = this.nodes.get(nodeId)?.data.attributes.get(name);

			if (connection) {
				value = ctx[connection.fromId][connection.fromPort];
			} else {
				const node = this.nodes.get(nodeId)!;
				value = node.data.attributes.get(name)?.controller?.value as Value<any>;
			}

			if (!value && !targetAttribute?.port?.nullable) {
				throw new Error(`Could not find value for ${nodeId}.${name}`);
			}

			return value;
		};
	}

	execute(nodeId: string, path: Lowercase<string> = 'execution-in', ctx?: ExecutionContext['values']) {
		const node = this.nodes.get(nodeId);
		if (!node) {
			throw new Error(`Node with id ${nodeId} does not exist`);
		}

		const context: ExecutionContext = {
			engine: this as Engine,
			values: ctx ?? {},
			set(name: string, value: Value<any>) {
				this.values[nodeId] = {
					...this.values[nodeId],
					[name]: value,
				};
			},
			get(name: string) {
				return this.engine.getGetter(nodeId, ctx ?? {})(name);
			},
			execute(path: string) {
				const node = this.engine.nodes.get(nodeId)!;
				const attribute = node.data.attributes.get(path);
				if (!attribute) {
					throw new Error(`Attribute '${path}' does not exist on node ${nodeId}`);
				}

				if (attribute.direction !== 'output' || attribute.port === undefined || attribute.port.type !== 'execution') {
					throw new Error(`Attribute '${path}' is not a valid output port`);
				}

				const connection = this.engine.connections.find(c => c.fromId === nodeId && c.fromPort === path);
				if (!connection) {
					throw new Error(`Attribute '${path}' is not connected`);
				}

				this.engine.execute(connection.toId, connection.toPort as Lowercase<string>, this.values);
			},
		};

		const handler = node.data.handlers.get(path);
		if (!handler) {
			throw new Error(`Handler '${path}' does not exist on node ${nodeId}`);
		}

		handler(context);
	}

	serialize() {
		const string = JSON.stringify(instanceToPlain(this, {
			enableImplicitConversion: true,
		}));
		return (string);
	}

	addNode(node: NodeData, position: NodeWrapper['position'], options: Omit<Partial<NodeWrapper>, 'data' | 'position' > = {}) {
		const id = options.id ?? v4();

		node.attributes.forEach(a => {
			a.nodeId = id;
		});

		this.nodes.set(id, new NodeWrapper({
			...options,
			data: _.cloneDeep(node),
			position,
			id,
		}));

		this.emit('node-added', id);

		return id;
	}

	getNode(id: string) {
		return this.nodes.get(id);
	}

	removeNode(id: string) {
		this.nodes.delete(id);
		this.connections = this.connections.filter(connection => connection.fromId !== id && connection.toId !== id);
		this.emit('node-removed', id);
	}

	updateNode(id: string, change: Partial<Omit<NodeWrapper, 'id'>>) {
		const node = this.nodes.get(id);
		if (!node) {
			throw new Error(`Node with id ${id} does not exist`);
		}

		const merged = _.merge(node, change);

		this.nodes.set(id, merged);

		this.emit('changed');
	}

	isCircular(fromId: string, toId: string): boolean {
		const from = this.nodes.get(fromId);
		const to = this.nodes.get(toId);

		if (!from) {
			throw new Error(`Node with id ${fromId} does not exist`);
		}

		if (!to) {
			throw new Error(`Node with id ${toId} does not exist`);
		}

		const outputConnections = this.connections.filter((connection: Connection) => connection.fromId === toId);

		if (outputConnections.length === 0) {
			return false;
		}

		if (outputConnections.some((connection: Connection) => connection.toId === fromId)) {
			return true;
		}

		for (const connection of outputConnections) {
			if (this.isCircular(fromId, connection.toId)) {
				return true;
			}
		}

		return false;
	}

	canConnectPorts(from: {port: Attribute<any, any, any>['port']; direction: Attribute<any, any, any>['direction']}, to: Attribute<any, any, any>) {
		if (from.direction === to.direction) {
			throw new Error('Cannot connect ports of the same direction');
		}

		if (!from.port || !to.port) {
			throw new Error('Cannot connect ports that do not exist');
		}

		if (from.port.type !== to.port.type) {
			throw new Error('Cannot connect ports of different types');
		}

		if (from.port.datatype !== undefined && to.port.datatype !== undefined) {
			if (from.port.datatype.type !== to.port.datatype.type) {
				throw new Error('Cannot connect ports of different datatypes');
			}

			if (from.port.datatype.isArray !== to.port.datatype.isArray) {
				throw new Error('Cannot connect an array port and a non-array port');
			}
		}
	}

	canConnect(options: Omit<Connection, 'id'>) {
		const {fromId, fromPort, toId, toPort} = options;
		const from = this.nodes.get(fromId);
		const to = this.nodes.get(toId);

		if (!from) {
			throw new Error(`Node with id ${fromId} does not exist`);
		}

		if (!to) {
			throw new Error(`Node with id ${toId} does not exist`);
		}

		const fromPortInstance = from.data.attributes.get(fromPort);
		const toPortInstance = to.data.attributes.get(toPort);

		if (!fromPortInstance || fromPortInstance.port === undefined) {
			throw new Error(`Attribute ${fromPort} does not exist or does not have a connectable port`);
		}

		if (!toPortInstance || toPortInstance.port === undefined) {
			throw new Error(`Attribute ${toPort} does not exist or does not have a connectable port`);
		}

		if (fromId === toId) {
			throw new Error('Cannot connect a node to itself');
		}

		if (toPortInstance.direction === 'input' && this.connections.some((connection: Connection) => connection.toId === toId && connection.toPort === toPort)) {
			throw new Error('Cannot connect to an input port that already has a connection');
		}

		this.canConnectPorts(fromPortInstance, toPortInstance);

		if (this.isCircular(fromId, toId)) {
			throw new Error('Cannot connect nodes in a circular fashion');
		}

		return true;
	}

	connect(options: Omit<Connection, 'id'>) {
		this.canConnect(options);

		this.connections.push({
			...options,
			id: v4(),
		});

		this.emit('changed');
	}

	disconnect(id: string) {
		const index = this.connections.findIndex((connection: Connection) => connection.id === id);
		if (index === -1) {
			throw new Error(`Connection with id ${id} does not exist`);
		}

		this.connections.splice(index, 1);
		this.emit('changed');
		return index;
	}

	isConnected(node: string, port: Lowercase<string>) {
		return this.connections.some((connection: Connection) => (connection.fromId === node && connection.fromPort === port) || (connection.toId === node && connection.toPort === port));
	}
}
