import {Box, Divider, Flex, Paper, Text} from '@mantine/core';
import React, {useEffect, useRef} from 'react';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import NodeBody from './NodeBody';
import NodeHeader from './NodeHeader';

export type NodeProps = {
	node: NodeWrapper<NodeData>;
	dragging: boolean;
	selected: boolean;
};

export default function Node(props: NodeProps) {
	const [showJson, setShowJson] = React.useState(false);
	const [dimensions, setDimensions] = React.useState <{w: number; h: number} | undefined>(undefined);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current === null) {
			return;
		}

		const {width, height} = ref.current.getBoundingClientRect();
		setDimensions({w: Math.ceil(width / 50) * 50, h: Math.ceil(height / 50) * 50});
	}, [ref]);

	return (
		<Paper w={dimensions?.w} h={dimensions?.h} radius={'lg'} shadow={'md'} withBorder sx={_ => ({overflow: 'hidden'})} ref={ref}>
			<Flex direction={'column'} justify={'space-between'} h={dimensions?.h}>
				<NodeHeader node={props.node} />
				<NodeBody node={props.node} />

				<Box style={{flexGrow: 1}} />
				<Divider />
				<Flex style={{justifySelf: 'flex-end'}} m={'md'} direction={'row'} justify={'space-between'} align={'center'}>
					<Text opacity={0.5}>
						{
							props.node.id
						}
					</Text>
				</Flex>
			</Flex>
		</Paper>
	);
}

