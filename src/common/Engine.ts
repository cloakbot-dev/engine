import {instanceToPlain, plainToInstance} from 'class-transformer';
import {compress, decompress} from 'compressed-json';
import {type NodeData} from './classes/Node';
import {type Node, type Connection} from '../types';
import {v4} from 'uuid';
import _ from 'lodash';

export class Engine {
	static load(string: string) {
		return plainToInstance(Engine, decompress(JSON.parse(string)));
	}

	nodes: Array<Node<NodeData>> = [];
	connections: Connection[] = [];

	constructor() {
		this.nodes = [];
		this.connections = [];
	}

	serialize() {
		const string = JSON.stringify(compress(instanceToPlain(this)));
		return (string);
	}

	addNode(node: NodeData, options?: Partial<Omit<Node<NodeData>, 'data'>>) {
		this.nodes.push({
			id: v4(),
			position: options?.position ?? {x: 0, y: 0},
			selected: options?.selected ?? false,
			locked: options?.locked ?? false,
			immortal: options?.immortal ?? false,
			data: node,
		});
	}

	connect(fromId: string, toId: string, fromPort: string, toPort: string) {
		const fromNode = this.nodes.find((node: Node<any>) => node.id === fromId);
		const toNode = this.nodes.find((node: Node<any>) => node.id === toId);

		if (!fromNode) {
			throw new Error(`Node with id ${fromId} does not exist`);
		}

		if (!toNode) {
			throw new Error(`Node with id ${toId} does not exist`);
		}

		this.connections.push({
			fromId,
			toId,
			fromPort,
			toPort,
		});
	}

	disconnect(fromId: string, toId: string, fromPort: string, toPort: string) {
		const index = this.connections.findIndex(
			(connection: Connection) => _.isEqual(connection, {fromId, toId, fromPort, toPort}),
		);

		if (index === -1) {
			throw new Error('Connection does not exist');
		} else {
			this.connections.splice(index, 1);
		}

		return index;
	}
}
