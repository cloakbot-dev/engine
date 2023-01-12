/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable new-cap */
import {type XYPosition} from 'reactflow';
import {instanceToPlain} from 'class-transformer';
import {plainToInstance, Type} from 'class-transformer';
import {type NodeData} from './classes/Node';
import {type Connection} from '../types';
import {v4} from 'uuid';
import _ from 'lodash';
import {NodeWrapper} from './classes/NodeWrapper';
import {compress, decompress} from 'compressed-json';

export class Engine {
	static load(string: string) {
		return plainToInstance(Engine, decompress(JSON.parse(string)));
	}

	@Type(() => NodeWrapper<NodeData>) nodes = new Map<string, NodeWrapper<NodeData>>();
	connections: Connection[] = [];

	serialize() {
		const string = JSON.stringify(compress(instanceToPlain(this)));
		return (string);
	}

	addNode(node: NodeData, position: XYPosition, options?: Partial<Omit<NodeWrapper<NodeData>, 'data' | 'position'>>) {
		const id = options?.id ?? v4();
		this.nodes.set(id, {
			id,
			position: {
				x: position.x,
				y: position.y,
			},
			data: node,
			...options,
		});
		return id;
	}

	removeNode(id: string) {
		this.nodes.delete(id);
		this.connections = this.connections.filter(connection => connection.fromId !== id && connection.toId !== id);
	}

	updateNode(id: string, change: Partial<Omit<NodeWrapper<NodeData>, 'id'>>) {
		const node = this.nodes.get(id);
		if (!node) {
			throw new Error(`Node with id ${id} does not exist`);
		}

		this.nodes.set(id, {
			...node,
			...change,
			data: {
				...node.data,
				...change.data,
			} as NodeData,
		});
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

	canConnect(fromId: string, toId: string, fromPortName: Lowercase<string>, toPortName: Lowercase<string>) {
		const from = this.nodes.get(fromId);
		const to = this.nodes.get(toId);

		if (!from) {
			throw new Error(`Node with id ${fromId} does not exist`);
		}

		if (!to) {
			throw new Error(`Node with id ${toId} does not exist`);
		}

		const fromPort = from.data.attributes.get(fromPortName);
		const toPort = to.data.attributes.get(toPortName);

		if (!fromPort || fromPort.port === undefined) {
			throw new Error(`Attribute ${fromPortName} does not exist or does not have a connectable port`);
		}

		if (!toPort || toPort.port === undefined) {
			throw new Error(`Attribute ${toPortName} does not exist or does not have a connectable port`);
		}

		if (fromId === toId) {
			throw new Error('Cannot connect a node to itself');
		}

		if (fromPort.direction === toPort.direction) {
			throw new Error('Cannot connect ports of the same direction');
		}

		if (fromPort.port.type !== toPort.port.type) {
			throw new Error('Cannot connect ports of different types');
		}

		if (this.connections.some((connection: Connection) => connection.fromId === fromId && connection.fromPort === fromPortName)) {
			throw new Error('Connection from port already exists');
		}

		if (fromPort.port.datatype !== undefined && toPort.port.datatype !== undefined) {
			if (fromPort.port.datatype.type !== toPort.port.datatype.type) {
				throw new Error('Cannot connect ports of different datatypes');
			}

			if (fromPort.port.datatype.isArray !== toPort.port.datatype.isArray) {
				throw new Error('Cannot connect an array port and a non-array port');
			}
		}

		if (this.isCircular(fromId, toId)) {
			throw new Error('Cannot connect nodes in a circular fashion');
		}

		return true;
	}

	connect(fromId: string, toId: string, fromPort: Lowercase<string>, toPort: Lowercase<string>) {
		if (!this.canConnect(fromId, toId, fromPort, toPort)) {
			throw new Error('Cannot connect ports');
		}

		this.connections.push({
			id: v4(),
			fromId,
			toId,
			fromPort,
			toPort,
		});
	}

	disconnect(id: string) {
		const index = this.connections.findIndex((connection: Connection) => connection.id === id);
		if (index === -1) {
			throw new Error(`Connection with id ${id} does not exist`);
		}

		this.connections.splice(index, 1);
		return index;
	}
}
