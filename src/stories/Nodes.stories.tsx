/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import {type ComponentStory, type ComponentMeta} from '@storybook/react';
import Node from '../components/Node';
import React, {useState} from 'react';
import 'reactflow/dist/style.css';
import {Engine} from '../common/Engine';
import {engineContext, handleConnection, handleEdgesChange, handleNodesChange} from '../components/EngineProvider';
import CustomNode, {type CustomNodeProps} from '../components/reactflow/CustomNode';
import {Attribute} from '../common/classes/Attribute';
import {NodeData} from '../common/classes/Node';
import {Port} from '../common/classes/Port';
import {SelectController} from '../common/controllers/SelectController';
import {NumberValue} from '../common/values/NumberValue';
import {StringValue} from '../common/values/StringValue';
import Renderer from '../components/Renderer';

const story: ComponentMeta<typeof Node> = {
	title: 'Node',
	component: Node,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [story => {
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
					custom: ((props: CustomNodeProps) => <CustomNode {...props} />) as any,
				},
			}}>
				{story()}
			</engineContext.Provider>
		);
	}],
};
export default story;

const node = new NodeData('math')
	.addAttribute(new Attribute<StringValue<false>>('method', 'input')
		.setController(new SelectController([{
			label: 'Add',
			value: new StringValue('add'),
		},
		{
			label: 'Subtract',
			value: new StringValue('subtract'),
		}])))
	.addAttribute(new Attribute('a', 'input').setPort(new Port('data', new NumberValue(0))))
	.addAttribute(new Attribute('b', 'input').setPort(new Port('data', new NumberValue(0))))
	.addAttribute(new Attribute('result', 'output').setPort(new Port('data', new NumberValue(0))))
	.addInputExecution();

const NodeTemplate: ComponentStory<any> = () => <div style={{width: '100vw', height: '100vh'}}><Renderer initialize={e => {
	e.addNode(node, {x: 0, y: 0});
	e.addNode(node, {x: 600, y: 0});
	e.addNode(node, {x: 600, y: 400});
	return e;
}}/></div>;

export const MathNode = NodeTemplate.bind({});
MathNode.args = {};
