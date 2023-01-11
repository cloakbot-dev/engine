import 'reflect-metadata';
import {type ComponentStory, type ComponentMeta} from '@storybook/react';
import {Attribute} from '../common/classes/Attribute';
import {NodeData} from '../common/classes/Node';
import {Port} from '../common/classes/Port';
import {Engine} from '../common/Engine';
import {NumberValue} from '../common/values/NumberValue';
import Node, {type NodeProps} from '../components/Node';
import {StringValue} from '../common/values/StringValue';
import {StringController} from '../common/controllers/StringController';
import React from 'react';
import {SelectController} from '../common/controllers/SelectController';

const story: ComponentMeta<typeof Node> = {
	title: 'Node',
	component: Node,
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

const engine = new Engine();
const id = engine.addNode(node);

console.log(engine.nodes.size);

const NodeTemplate: ComponentStory<typeof Node> = (args: NodeProps) => <Node {...args} />;

export const MathNode = NodeTemplate.bind({});
MathNode.args = {
	node: engine.nodes.get(id),
	engine,
};
