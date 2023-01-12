/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {type ReactFlowProps} from '@reactflow/core';
import React, {createContext, useState} from 'react';
import {Engine} from '../common/Engine';

export const handleConnection = (connection: Parameters<NonNullable<ReactFlowProps['onConnect']>>['0'], engine: Engine) => {
	if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
		return engine;
	}

	engine.connect(connection.source, connection.target, connection.sourceHandle as Lowercase<string>, connection.targetHandle as Lowercase<string>);

	engine.emit('changed');
	return engine;
};

export const handleEdgesChange = (changes: Parameters<NonNullable<ReactFlowProps['onEdgesChange']>>['0'], engine: Engine) => {
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

	engine.emit('changed');
	return engine;
};

export const handleNodesChange = (changes: Parameters<NonNullable<ReactFlowProps['onNodesChange']>>['0'], engine: Engine) => {
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
				if (!change.position || !change.positionAbsolute) {
					break;
				}

				engine.updateNode(change.id, {
					...change,
					position: change.position,
					positionAbsolute: change.positionAbsolute,
					type: 'custom',
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

	engine.emit('changed');
	return engine;
};

export type EngineContext = {
	engine: Engine;
	setEngine: (e: Engine) => void;
	handleConnection: typeof handleConnection;
	handleEdgesChange: typeof handleEdgesChange;
	handleNodesChange: typeof handleNodesChange;
	nodeTypes: ReactFlowProps['nodeTypes'];
};

export const engineContext = createContext<EngineContext | undefined>(undefined);

export default function EngineProvider(props: React.PropsWithChildren) {
	const [engine, setEngine] = useState<Engine>(new Engine());

	React.useEffect(() => {
		const l = () => {
			setEngine(e => e);
		};

		engine.on('changed', l);
	}, [engine]);

	return (
		<engineContext.Provider value={{
			engine,
			setEngine,
			handleConnection,
			handleEdgesChange,
			handleNodesChange,
			nodeTypes: {
				custom: () => <div>AAA</div>,
			},
		}}>
			{props.children}
		</engineContext.Provider>
	);
}

