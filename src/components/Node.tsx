import React from 'react';
import NodeHeader, {type NodeHeaderProps} from './header/NodeHeader';
import {Paper} from '@mantine/core';
import NodeBody, {type NodeBodyProps} from './body/NodeBody';

export type NodeProps = {
	header: NodeHeaderProps;
} & Partial<NodeBodyProps>;

export default function Node(props: NodeProps) {
	return <Paper withBorder shadow={'md'} radius={'md'} sx={_ => ({
		overflow: 'hidden',
	})}>
		<NodeHeader {...props.header} />
		<NodeBody {...props} />
	</Paper>;
}
