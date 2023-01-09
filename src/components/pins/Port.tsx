import {useHover} from '@mantine/hooks';
import {Flex, useMantineColorScheme} from '@mantine/core';
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
	const {colorScheme} = useMantineColorScheme();
	const type = props.type ?? 'data';
	const fallbackColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
	const icon = type === 'execution' ? IconArrowBadgeRight : IconCircle;

	return (
		<Flex align={'center'} justify={'center'} ref={ref} w={'xl'	}>
			{
				React.createElement(icon, {
					color: props.color ?? fallbackColor,
					stroke: (hovered && !props.connected) ? 2.5 : 1.1,
					size: type === 'execution' ? 30 : 23,
					style: {transition: '0.25s ease all'},
					fill: props.connected ? props.color ?? fallbackColor : 'transparent',
				})}
		</Flex>
	);
}
