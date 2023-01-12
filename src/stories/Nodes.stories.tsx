
import 'reflect-metadata';
import {type ComponentStory, type ComponentMeta} from '@storybook/react';
// Import {Attribute} from '../common/classes/Attribute';
// import {NodeData} from '../common/classes/Node';
// import {Port} from '../common/classes/Port';
// import {NumberValue} from '../common/values/NumberValue';
import Node from '../components/Node';
// Import {StringValue} from '../common/values/StringValue';
import React from 'react';
// Import {SelectController} from '../common/controllers/SelectController';
import {engineContext, engineContextInitalState} from '../components/EngineProvider';
import Renderer from '../components/Renderer';
import 'reactflow/dist/style.css';

const story: ComponentMeta<typeof Node> = {
	title: 'Node',
	component: Node,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [story => <engineContext.Provider value={engineContextInitalState()}>{story()}</engineContext.Provider>],
};
export default story;

// Const node = new NodeData('math')
// 	.addAttribute(new Attribute<StringValue<false>>('method', 'input')
// 		.setController(new SelectController([{
// 			label: 'Add',
// 			value: new StringValue('add'),
// 		},
// 		{
// 			label: 'Subtract',
// 			value: new StringValue('subtract'),
// 		}])))
// 	.addAttribute(new Attribute('a', 'input').setPort(new Port('data', new NumberValue(0))))
// 	.addAttribute(new Attribute('b', 'input').setPort(new Port('data', new NumberValue(0))))
// 	.addAttribute(new Attribute('result', 'output').setPort(new Port('data', new NumberValue(0))))
// 	.addInputExecution();

const NodeTemplate: ComponentStory<any> = () => <div><Renderer/></div>;

export const MathNode = NodeTemplate.bind({});
MathNode.args = {};
