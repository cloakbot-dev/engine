import {Box, Flex, Text} from '@mantine/core';
import _ from 'lodash';
import React from 'react';
import {type Attribute} from '../common/classes/Attribute';
import NodePort from './NodePort';

export type NodeAttributeProps = {
	attr: Attribute<any>;
};

export default function NodeAttribute(props: NodeAttributeProps) {
	return (
		<Flex key={props.attr.name} direction={props.attr.direction === 'input' ? 'row' : 'row-reverse'} align={'center'} gap={'lg'}>
			{props.attr.port && <NodePort attribute={props.attr} color={props.attr.port?.color} port={props.attr.port} connected={false} />}

			<Flex direction={'column'}>
				<Text fz={'md'}>
					{_.capitalize(props.attr.label)}
				</Text>
				{
					props.attr.controller === undefined ? null : <Box m={'sm'} mt={'xs'}>
						{props.attr.controller.render()}
					</Box>
				}
			</Flex>
		</Flex>
	);
}

