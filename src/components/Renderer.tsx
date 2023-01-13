import {showNotification} from '@mantine/notifications';
import React from 'react';
import {Background, BackgroundVariant, ConnectionLineType, ReactFlow, type Edge} from 'reactflow';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import {type Engine} from '../common/Engine';
import {engineContext, handleConnection, handleEdgesChange, handleEdgeUpdate, handleNodesChange} from './EngineProvider';

export type RendererProps = {
	initialize?: (engine: Engine) => Engine;
};

function getNodes(engine: Engine): Array<NodeWrapper<NodeData>> {
	const arr = Array.from(engine.nodes.values());
	return arr;
}

function getEdges(engine: Engine): Edge[] {
	return engine.connections.map(conn => ({
		id: conn.id,

		source: conn.fromId,
		target: conn.toId,

		sourceHandle: conn.fromPort,
		targetHandle: conn.toPort,

		sourceNode: engine.nodes.get(conn.fromId),
		targetNode: engine.nodes.get(conn.toId),

		style: {
			strokeWidth: 3,
			stroke: `${(conn.color as string) ?? '#fff'}`,
			opacity: 0.8,
			strokeLinecap: 'round',
		},
	}));
}

export default function Renderer(props: RendererProps) {
	const ctx = React.useContext(engineContext);

	if (!ctx) {
		throw new Error('No engine context found!');
	}

	const [nodes, setNodes] = React.useState < Array < NodeWrapper<NodeData>>>([]);
	const [edges, setEdges] = React.useState<Edge[]>([]);

	const [initialized, setInitialized] = React.useState(false);
	React.useEffect(() => {
		if (props.initialize && !initialized) {
			ctx.setEngine(props.initialize(ctx.engine));
		}

		setInitialized(true);
	}, []);

	React.useEffect(() => {
		setNodes(getNodes(ctx.engine) || []);
		setEdges(getEdges(ctx.engine) || []);

		const l = () => {
			setNodes(getNodes(ctx.engine));
			setEdges(getEdges(ctx.engine));
		};

		ctx.engine.on('changed', l);

		return () => {
			ctx.engine.off('changed', l);
		};
	}, [ctx.engine]);

	const showError = (s: string) => {
		showNotification({
			title: 'Error',
			message: s,
			color: 'red',
			autoClose: 5000,
		});
	};

	return (
		<ReactFlow {...ctx} nodes={nodes} edges={edges}
			edgesFocusable={false}
			defaultEdgeOptions={{
				zIndex: 2000,
				style: {
					strokeLinecap: 'round',
				},
			}}
			onNodesChange={c => {
				ctx.setEngine(handleNodesChange(c, ctx.engine));
			}}
			onEdgesChange={c => {
				ctx.setEngine(handleEdgesChange(c, ctx.engine));
			}}
			onConnect={c => {
				ctx.setEngine(handleConnection(c, ctx.engine, showError));
			}}

			onEdgeUpdate={(o, n) => {
				ctx.setEngine(handleEdgeUpdate(o, n, ctx.engine, showError));
			}}

			edgeUpdaterRadius={10}

			connectionLineStyle={{
				strokeWidth: 3,
				strokeDasharray: '15 15',
				opacity: 0.4,
			}}

			connectionLineType={ConnectionLineType.Bezier}
		>
			<Background variant={BackgroundVariant.Cross} size={10} gap={ctx.backgroundGap} color={'#ffffff20'} />
		</ReactFlow>
	);
}
