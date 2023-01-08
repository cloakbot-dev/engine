import {Box, Flex, Space} from '@mantine/core';
import React from 'react';
import NodeAttribute, {type NodeAttributeProps} from '../attribute/NodeAttribute';

export type NodeBodyProps = {
	inputs?: Array<Omit<NodeAttributeProps, 'omit'>>;
	outputs?: Array<Omit<NodeAttributeProps, 'controller' | 'controllerDefaultValue' | 'reverse'>>;
};

export default function NodeBody(props: NodeBodyProps) {
	return (
		<Box p={'md'}>
			<Flex direction={'column'} gap={'sm'}>
				{
					props.inputs?.map((input, index) => (
						<NodeAttribute key={index} {...input} />
					))
				}
			</Flex>

			<Space h={'md'} />

			<Flex direction={'column'} gap={'sm'}>
				{
					props.outputs?.map((output, index) => (
						<NodeAttribute reversed key={index} {...output} />
					))
				}
			</Flex>
		</Box>
	);
}
