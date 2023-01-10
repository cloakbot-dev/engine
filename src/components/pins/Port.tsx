import {useHover} from '@mantine/hooks';
import {Flex, Tooltip, useMantineColorScheme} from '@mantine/core';
import {IconArrowBadgeRight, IconCircle, IconQuestionCircle, IconDotsCircleHorizontal} from '@tabler/icons';
import React from 'react';
import {type Color, type PortTypes} from '../../types';

export type PortProps = {
	connected?: boolean;
	datatype?: string;
	type?: PortTypes;
	color?: Color;
	nullable?: boolean;
	array?: boolean;
};

export default function Port(props: PortProps) {
	const {
		ref,
		hovered,
	} = useHover();
	const {colorScheme} = useMantineColorScheme();
	const type = props.type ?? 'data';
	const fallbackColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
	const icon = type === 'execution' ? IconArrowBadgeRight : props.array ? IconDotsCircleHorizontal : (props.nullable ? IconQuestionCircle : IconCircle);

	return (
		<Tooltip label={(props.datatype ?? '') + (props.nullable && !props.array ? '?' : '') + (props.array ? '[]' : '')} opened={props.datatype ? undefined : false} withArrow >
			<Flex align={'center'} justify={'center'} ref={ref} w={'xl'	}>
				{
					React.createElement(icon, {
						color: props.color ?? fallbackColor,
						stroke: (hovered && !props.connected) ? 3 : undefined,
						size: type === 'execution' ? 30 : 23,
						style: {transition: '0.25s ease all'},
						fill: props.connected ? props.color ?? fallbackColor : 'transparent',
					})}
			</Flex>
		</Tooltip>
	);
}
