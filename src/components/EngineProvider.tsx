/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {createContext} from 'react';
import {type Edge, type Node, type ReactFlowProps} from 'reactflow';
import {type NodeData} from '../common/classes/Node';
import {Engine} from '../common/Engine';
import CustomNode from './reactflow/CustomNode';

export type EngineContext = {
	engine: Engine;
	nodes: Array<Node<NodeData>>;
	edges: Edge[];

	onNodesChange: ReactFlowProps['onNodesChange'];
	onEdgesChange: ReactFlowProps['onEdgesChange'];
	onConnect: ReactFlowProps['onConnect'];

	nodeTypes: ReactFlowProps['nodeTypes'];
};

export const engineContext = createContext<EngineContext | undefined>(undefined);

export function engineContextInitalState() {
	const engine = new Engine();

	function getNodes(): EngineContext['nodes'] {
		const arr = Array.from(engine.nodes.values());
		return arr;
	}

	function getEdges(): EngineContext['edges'] {
		return engine.connections.map(conn => ({
			id: conn.id,

			source: conn.fromId,
			target: conn.toId,

			sourceHandle: conn.fromPort,
			targetHandle: conn.toPort,

			sourceNode: engine.nodes.get(conn.fromId),
			targetNode: engine.nodes.get(conn.toId),
		}));
	}

	const handleConnection: ReactFlowProps['onConnect'] = connection => {
		if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
			return;
		}

		engine.connect(connection.source, connection.target, connection.sourceHandle as Lowercase<string>, connection.targetHandle as Lowercase<string>);
	};

	const handleEdgesChange: ReactFlowProps['onEdgesChange'] = changes => {
		for (const change of changes) {
			switch (change.type) {
				case 'add':
					engine.connect(change.item.source, change.item.target, change.item.sourceHandle as Lowercase<string>, change.item.targetHandle as Lowercase<string>);
					break;
				case 'remove':
					engine.disconnect(change.id);
					break;
				case 'reset':
					console.warn('Unhandled case \'reset\'');
					break;
				case 'select':
					console.warn('Unhandled case \'select\'');
					break;
				default:
					break;
			}
		}
	};

	const handleNodesChange: ReactFlowProps['onNodesChange'] = changes => {
		for (const change of changes) {
			switch (change.type) {
				case 'add':
					engine.addNode(change.item.data, change.item.position, {
						...change.item,
						width: change.item.data.width ?? undefined,
						height: change.item.data.height ?? undefined,
					});
					break;
				case 'remove':
					engine.removeNode(change.id);
					break;
				case 'position':
					engine.updateNode(change.id, {
						position: change.position,
					});
					break;
				case 'select':
					engine.updateNode(change.id, {
						selected: change.selected,
					});
					break;
				case 'dimensions':
					engine.updateNode(change.id, {
						width: change.dimensions?.width,
						height: change.dimensions?.height,
					});
					break;
				default:
					break;
			}
		}
	};

	const initialState = {
		engine,
		nodes: getNodes(),
		edges: getEdges(),

		onConnect: handleConnection,
		onEdgesChange: handleEdgesChange,
		onNodesChange: handleNodesChange,

		nodeTypes: {
			custom: (props: any) => <CustomNode {...props} />,
		},
	};

	return initialState;
}

export default function EngineProvider(props: React.PropsWithChildren) {
	const [state, _setState] = React.useState<EngineContext>(engineContextInitalState());

	return (
		<engineContext.Provider value={state}>
			<div className='ENGINE-CONTEXT'>
				{props.children}
			</div>
		</engineContext.Provider>
	);
}
