import {Box, Flex, Text, useMantineTheme, Divider} from '@mantine/core';
import React from 'react';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import NodePort from './NodePort';

export type NodeHeaderProps = {
	node: NodeWrapper<NodeData>;
};

export default function NodeHeader(props: NodeHeaderProps) {
	const theme = useMantineTheme();
	return (
		<Box w={'100%'} p={'md'} sx={theme => ({
			background: theme.fn.linearGradient(20, props.node.data.color, theme.fn.rgba(props.node.data.color, 0.2)),
		})}>
			<Flex gap={'sm'} align={'center'}>
				<>
					{
						(() => {
							const attribute = props.node.data.attributes.get('execution-in');
							if (attribute) {
								return <NodePort attribute={attribute} color={props.node.data.accentColor}
									port={attribute.port!} connected={false} />;
							}
						})()
					}
					<Divider
						sx={_ => ({flexGrow: 1})}
						labelPosition={'center'}
						color={theme.fn.rgba(props.node.data.accentColor, 0.5)}
						label={<>
							<Text fz={'xl'} color={props.node.data.accentColor}>
								{props.node.data.label}
							</Text>
						</>}
					/>

				</>
			</Flex>
		</Box>
	);
}
