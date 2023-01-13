import React from 'react';
import {IconCircle, IconQuestionCircle, IconCodeCircle2, IconArrowBadgeRight} from '@tabler/icons';
import {type Port} from '../common/classes/Port';
import {type Color} from '../types';
import {useHover} from '@mantine/hooks';
import {Box, Center, Tooltip, useMantineTheme} from '@mantine/core';
import {Handle, Position} from 'reactflow';
import {type Attribute} from '../common/classes/Attribute';

export type PortProps = {
	port: Port<boolean>;
	color: Color;
	connected: boolean;
	attribute: Attribute<any, Lowercase<string>, any>;
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

	const theme = useMantineTheme();
	const isArray = props.port.datatype?.isArray;
	const isNullable = props.port.nullable;
	const datatypeLabel = `${props.port.datatype?.type ?? 'unknown'}${isNullable ? '?' : ''}${isArray ? '[]' : ''}`;

	return <Tooltip label={datatypeLabel} withArrow opened={(props.port.datatype === undefined) ? false : undefined}>
		<Box pos={'relative'} ref={ref}>
			<Handle style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				opacity: 0,
				transform: 'translate(-50%, -50%)',
				width: theme.spacing.xl,
				height: theme.spacing.xl,

			}} type={props.attribute.direction === 'input' ? 'target' : 'source'} id={props.attribute.name} position={props.attribute.direction === 'input' ? Position.Left : Position.Right} />
			<Center>
				{React.createElement(icon(), {
					color: props.color,
					size: 30,
					stroke: (hovered || props.connected) ? 2 : 1.2,
					fill: props.connected ? props.color : 'transparent',
					style: {
						transition: 'all 0.4s ease',
					},
				})}
			</Center>
		</Box></Tooltip>;
}
