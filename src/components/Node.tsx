import {Paper} from '@mantine/core';
import React from 'react';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../types';
import NodeBody from './NodeBody';
import NodeHeader from './NodeHeader';

export type NodeProps = {
	node: NodeWrapper<NodeData>;
};

export default function Node(props: NodeProps) {
	return (
		<Paper radius={'lg'} shadow={'md'} withBorder sx={_ => ({overflow: 'hidden'})}>
			<NodeHeader node={props.node} />
			<NodeBody node={props.node} />
		</Paper>
	);
}

