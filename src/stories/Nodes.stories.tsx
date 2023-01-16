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
import {NumberController} from '../common/controllers/NumberController';
import {showNotification} from '@mantine/notifications';
import _ from 'lodash';
import {ButtonController} from '../common/controllers/output/ButtonController';
import {Text} from '@mantine/core';

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

const executionNode = new NodeData('execution')
	.setColors('#42f54b', '#ffffff')
	.addAttribute(new Attribute<NumberValue<false>>('_', 'output').setPort(new Port('execution', undefined)).setController(
		new ButtonController(() => {
			console.log('Debug Button is working!');
		}).setProps({
			children: <Text>Run</Text>,
			color: 'green',
			w: '100%',
		}),
	));

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
	.addAttribute(new Attribute<NumberValue<false>>('a', 'input').setPort(new Port('data', new NumberValue(0))).setController(new NumberController(new NumberValue(0))))
	.addAttribute(new Attribute<NumberValue<false>>('b', 'input').setPort(new Port('data', new NumberValue(0))).setController(new NumberController(new NumberValue(0))))
	.addAttribute(new Attribute('result', 'output').setPort(new Port('data', new NumberValue(0))))
	.addInputExecution()
	.addOutputExecution();

node.handle('execution-in', ctx => {
	switch (ctx.get('method').value) {
		case 'add':
			ctx.set('result', new NumberValue(ctx.get<number>('a').value + ctx.get<number>('b').value));
			break;
		case 'subtract':
			ctx.set('result', new NumberValue(ctx.get<number>('a').value - ctx.get<number>('b').value));
			break;
		default:
			break;
	}

	try {
		ctx.execute('execution-out');
	} catch (e) {
		showNotification({
			title: 'Error',
			color: 'red',
			message: (e as {message: string}).message,
		});
	}

	console.log(ctx.values);
});

const NodeTemplate: ComponentStory<any> = () => <div style={{width: '100vw', height: '100vh'}}><Renderer initialize={e => {
	e.addNode(executionNode, {x: 0, y: 0});
	e.addNode(node, {x: 500, y: 0});
	return e;
}}/></div>;

export const MathNode = NodeTemplate.bind({});
MathNode.args = {};
