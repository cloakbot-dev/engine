/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import {type ComponentStory, type ComponentMeta} from '@storybook/react';
import Node from '../components/Node';
import React, {useState} from 'react';
import 'reactflow/dist/style.css';
import {Engine} from '../common/Engine';
import {engineContext, handleConnection, handleEdgesChange, handleNodesChange} from '../components/EngineProvider';
import CustomNode, {type CustomNodeProps} from '../components/reactflow/CustomNode';
import _ from 'lodash';
import {NodeManager} from '../nodes';
import Renderer from '../components/Renderer';

const story: ComponentMeta<typeof Node> = {
	title: 'Node',
	component: Node,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [story => {
		const [engine, setEngine]	 = useState<Engine>(new Engine());

		React.useEffect(() => {
			const l = () => {
				setEngine(e => _.cloneDeep(e));
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
				backgroundGap: 50,
				nodeTypes: {
					custom: ((props: CustomNodeProps) => <CustomNode {...props} />) as any,
				},
			}}>
				{story()}
			</engineContext.Provider>
		);
	}],
};
export default story;

const NodeTemplate: ComponentStory<any> = () => <div style={{width: '100vw', height: '100vh'}}><Renderer initialize={e => {
	console.log(NodeManager.nodes);
	return e;
}
} /></div>;

export const MathNode = NodeTemplate.bind({});
MathNode.args = {};
