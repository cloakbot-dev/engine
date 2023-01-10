import React from 'react';
import {IconCircle, IconQuestionCircle, IconCodeCircle2, IconArrowBadgeRight} from '@tabler/icons';
import {type Port} from '../common/classes/Port';
import {type Color} from '../types';
import {useHover} from '@mantine/hooks';
import {Center, Tooltip} from '@mantine/core';

export type PortProps = {
	port: Port<boolean>;
	color: Color;
	connected: boolean;
};

export default function NodePort(props: PortProps) {
	const icon = () => {
		if (props.port.type === 'execution') {
			return IconArrowBadgeRight;
		}

		if (props.port.datatype?.isArray) {
			return IconCodeCircle2;
		}

		if (props.port.nullable) {
			return IconQuestionCircle;
		}

		return IconCircle;
	};

	const {ref, hovered} = useHover();

	const isArray = props.port.datatype?.isArray;
	const isNullable = props.port.nullable;
	const datatypeLabel = `${props.port.datatype?.type ?? 'unknown'}${isNullable ? '?' : ''}${isArray ? '[]' : ''}`;

	return <Tooltip label={datatypeLabel} withArrow opened={(props.port.datatype === undefined) ? false : undefined}><Center ref={ref}>
		{
			React.createElement(icon(), {
				color: props.color,
				size: 30,
				stroke: hovered ? 2 : 1.2,
				fill: props.connected ? props.color : 'transparent',
				style: {
					transition: 'all 0.2s ease',
				},
			})}
	</Center></Tooltip>;
}
