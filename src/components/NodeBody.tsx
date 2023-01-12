import {Flex} from '@mantine/core';
import React from 'react';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import NodeAttribute from './NodeAttribute';

export type NodeBodyProps = {
	node: NodeWrapper<NodeData>;
};

export default function NodeBody(props: NodeBodyProps) {
	return (
		<Flex direction={'column'} gap={'md'} p={'md'}>
			{
				Array.from(props.node.data.attributes.entries()).filter(([key]) => key !== 'execution-in' && key !== 'execution-out').map(([key, attr]) =>
					<NodeAttribute key={key} attr={attr} node={props.node} />,
				)
			}
		</Flex>
	);
}

