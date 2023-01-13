import {Divider, Flex, Paper, Text} from '@mantine/core';
import React, {useContext, useEffect, useRef} from 'react';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import {engineContext} from './EngineProvider';
import NodeBody from './NodeBody';
import NodeHeader from './NodeHeader';

export type NodeProps = {
	node: NodeWrapper<NodeData>;
	dragging: boolean;
	selected: boolean;
};

export default function Node(props: NodeProps) {
	const [dimensions, setDimensions] = React.useState <{w: number; h: number} | undefined>(undefined);
	const ctx = useContext(engineContext);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current === null || ctx === undefined) {
			return;
		}

		const {width, height} = ref.current.getBoundingClientRect();

		if (width % ctx.backgroundGap !== 0 || height % ctx.backgroundGap !== 0) {
			return;
		}

		setDimensions({w: Math.ceil(width / ctx.backgroundGap) * ctx.backgroundGap, h: Math.ceil(height / ctx.backgroundGap) * ctx.backgroundGap});
	}, [ref]);

	return (
		<Paper w={dimensions?.w} h={dimensions?.h} radius={'lg'} shadow={'md'} withBorder sx={_ => ({overflow: 'hidden'})} ref={ref}>
			<Flex direction={'column'} justify={'space-between'} h={dimensions?.h}>
				<NodeHeader node={props.node} />
				<NodeBody node={props.node} />

				{/* <Box style={{flexGrow: 1}} /> */}
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

