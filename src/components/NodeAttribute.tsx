import {Box, Flex, Text} from '@mantine/core';
import _ from 'lodash';
import React, {useContext} from 'react';
import {type Attribute} from '../common/classes/Attribute';
import {type NodeData} from '../common/classes/Node';
import {type NodeWrapper} from '../common/classes/NodeWrapper';
import {engineContext} from './EngineProvider';
import NodePort from './NodePort';

export type NodeAttributeProps = {
	attr: Attribute<any>;
	node: NodeWrapper<NodeData>;
};

export default function NodeAttribute(props: NodeAttributeProps) {
	const ctx = useContext(engineContext);
	const [connected, setConnected] = React.useState(ctx?.engine.isConnected(props.node.id, props.attr.name) ?? false);
	React.useEffect(() => {
		const l = () => {
			setConnected(ctx?.engine.isConnected(props.node.id, props.attr.name) ?? false);
		};

		ctx?.engine.on('changed', l);

		return () => {
			ctx?.engine.off('changed', l);
		};
	}, [ctx?.engine]);

	return (
		<Flex key={props.attr.name} direction={props.attr.direction === 'input' ? 'row' : 'row-reverse'} align={'center'} gap={'lg'}>
			{props.attr.port && <NodePort attribute={props.attr} color={props.attr.port?.color} port={props.attr.port} connected={connected} />}

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

