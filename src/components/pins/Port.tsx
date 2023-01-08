import {useHover} from '@mantine/hooks';
import {Flex} from '@mantine/core';
import {IconArrowBadgeRight, IconCircle} from '@tabler/icons';
import React from 'react';
import {type Color, type PortTypes} from '../../types';

export type PortProps = {
	connected?: boolean;
	type?: PortTypes;
	color?: Color;
};

export default function Port(props: PortProps) {
	const {
		ref,
		hovered,
	} = useHover();

	const type = props.type ?? 'data';

	const icon = type === 'execution' ? IconArrowBadgeRight : IconCircle;

	return (
		<Flex align={'center'} justify={'center'} ref={ref}>
			{
				React.createElement(icon, {
					color: props.color ?? '#ffffff',
					stroke: (hovered && !props.connected) ? 1.5 : 0.9,
					size: type === 'execution' ? 30 : 23,
					style: {transition: '0.25s ease all'},
					fill: props.connected ? props.color ?? '#ffffff' : 'transparent',
				})}
		</Flex>
	);
}
