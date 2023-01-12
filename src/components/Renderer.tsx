/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {useContext} from 'react';
import {Background, BackgroundVariant, ReactFlow} from 'reactflow';
import {engineContext} from './EngineProvider';

export default function Renderer() {
	const engine = useContext(engineContext);
	return (
		<div style={{width: '100%', height: '100vh'}}>
			<ReactFlow {...engine}>
				<Background variant={BackgroundVariant.Cross} />
			</ReactFlow>
		</div>
	);
}
