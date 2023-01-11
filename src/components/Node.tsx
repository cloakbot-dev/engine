import {Button, Divider, Flex, Paper, Text} from '@mantine/core';
import React from 'react';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../types';
import NodeBody from './NodeBody';
import NodeHeader from './NodeHeader';
import {Prism} from '@mantine/prism';
import {type Engine} from '../common/Engine';
import {instanceToPlain} from 'class-transformer';

export type NodeProps = {
	node: NodeWrapper<NodeData>;
	engine: Engine;
};

export default function Node(props: NodeProps) {
	const [showJson, setShowJson] = React.useState(false);

	return (
		<Paper radius={'lg'} shadow={'md'} withBorder sx={_ => ({overflow: 'hidden'})}>
			<NodeHeader node={props.node} />
			<NodeBody node={props.node} />

			<Divider />
			<Flex m={'md'} direction={'row'} justify={'space-between'} align={'center'}>
				<Button variant={'subtle'} size={'xs'} onClick={() => {
					setShowJson(!showJson);
				}}>
				Toggle JSON view
				</Button>
				<Text opacity={0.5}>
					{
						props.node.id
					}
				</Text>
			</Flex>
			{
				showJson && (
					<Prism
						language={'json'}
						trim
					>
						{JSON.stringify(instanceToPlain(props.engine), null, 2)}
					</Prism>
				)
			}
		</Paper>
	);
}

