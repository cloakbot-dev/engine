import {Box, Flex} from '@mantine/core';
import React from 'react';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import NodeAttribute from './NodeAttribute';

export type NodeBodyProps = {
	node: NodeWrapper;
};

export default function NodeBody(props: NodeBodyProps) {
	const attributes = Array.from(props.node.data.attributes.entries()).filter(([key]) => key !== 'execution-in' && key !== 'execution-out');
	return (
		<Flex direction={'column'} gap={'md'} p={'md'}>
			{
				attributes.filter(([_, value]) => value.direction === 'input').map(([key, attr]) =>
					<NodeAttribute key={key} attr={attr} node={props.node} />,
				)
			}
			<Box style={{flexGrow: 1}} />
			{
				attributes.filter(([_, value]) => value.direction === 'output').map(([key, attr]) =>
					<NodeAttribute key={key} attr={attr} node={props.node} />,
				)
			}
		</Flex>
	);
}

