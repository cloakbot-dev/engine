import {type ComponentStory, type ComponentMeta} from '@storybook/react';
import {IconInfoCircle} from '@tabler/icons';
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
	},
};

export const Inputs = NodeTemplate.bind({});
Inputs.args = {
	...NodeTemplate.args,
	header: {
		title: 'Inputs',
		color: '#7303fc',
		accentColor: '#ffffff',
		icon: IconInfoCircle,

		leftPort: {},
		rightPort: {},
	},
	inputs: [
		{
			name: 'execution',
			label: 'Execution',
			port: {
				type: 'execution',
			},
		},
		{
			name: 'data',
			label: 'Data',
			port: {
				type: 'data',
			},
		},
		{
			name: 'execution-connected',
			label: '(Connected) Execution',
			port: {
				type: 'execution',
				connected: true,
			},
		},
		{
			name: 'data',
			label: '(Connected) Data',
			port: {
				type: 'data',
				connected: true,
			},
		},
	],
};
