import {Box, Flex, Text} from '@mantine/core';
import _ from 'lodash';
import React from 'react';
import {type Attribute} from '../common/classes/Attribute';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import useConnected from './hooks/useConnected';
import NodePort from './NodePort';

export type NodeAttributeProps = {
	attr: Attribute<any>;
	node: NodeWrapper<NodeData>;
};

export default function NodeAttribute(props: NodeAttributeProps) {
	// Const ctx = React.useContext(engineContext);
	const connected = useConnected(props.node.id, props.attr.name);

	return (
		<Flex key={props.attr.name} direction={props.attr.direction === 'input' ? 'row' : 'row-reverse'} align={'center'} gap={'lg'}>
			{props.attr.port && <NodePort attribute={props.attr} color={props.attr.port.datatype?.color ?? props.attr.port?.color} port={props.attr.port} connected={connected} />}

			<Flex direction={'row'} align={'center'} gap={'md'}>
				<Text fz={'md'}>
					{_.capitalize(props.attr.label)}
				</Text>
				{
					props.attr.controller === undefined ? null : <Box display={(connected && props.attr.direction === 'input') ? 'none' : 'inherit'}>
						{props.attr.controller.render()({})}
					</Box>
				}
			</Flex>
		</Flex>
	);
}

