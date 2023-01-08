import {Input, Textarea} from '@mantine/core';
import {type ComponentStory, type ComponentMeta} from '@storybook/react';
import {IconInfoCircle} from '@tabler/icons';
import {type NodeAttributeController} from '../components/attribute/NodeAttribute';
import Node from '../components/Node';

const story: ComponentMeta<typeof Node> = {
	title: 'Node',
	component: Node,
};
export default story;

// Template for the Node component
const NodeTemplate: ComponentStory<typeof Node> = args => <Node {...args} />;

// Stories
export const EmptyNode = NodeTemplate.bind({});
EmptyNode.args = {
	...NodeTemplate.args,
	header: {
		title: 'Empty',
		color: '#7303fc',
		accentColor: '#ffffff',
		icon: IconInfoCircle,
		rightPort: {
			connected: false,
		},
		leftPort: {
			connected: true,
		},
	},
	inputs: [
		{
			label: 'A',
			name: 'a',
			port: {
				connected: false,
				type: 'data',
			},
		},
		{
			label: 'A',
			name: 'a',
			port: {
				connected: false,
				type: 'data',
			},
		},
		{
			label: 'A',
			name: 'a',
			port: {
				connected: false,
				type: 'data',
			},
		},
	],
	outputs: [
		{
			label: 'B',
			name: 'b',
			port: {
				connected: false,
				type: 'data',
			},
		},
		{
			label: 'B',
			name: 'b',
			port: {
				connected: false,
				type: 'data',
			},
		},
		{
			label: 'B',
			name: 'b',
			port: {
				connected: false,
				type: 'data',
			},
		},
	],
};
