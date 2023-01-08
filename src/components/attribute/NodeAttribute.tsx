import React from 'react';
import {Flex, Text} from '@mantine/core';
import Port, {type PortProps} from '../pins/Port';

export type NodeAttributeController<T> = (value: T, setValue: (value: T) => void) => React.ReactNode;

export type NodeAttributeProps<T = any, Port extends PortProps = PortProps> = {
	name: string;
	label: string;
	hideLabel?: boolean;
	port?: Port;
	controller?: NodeAttributeController<T>;
	controllerDefaultValue?: T;

	reversed?: boolean;
};

export default function NodeAttribute<T>(props: NodeAttributeProps<T>) {
	const [controllerValue, setControllerValue] = React.useState<T | undefined>(props.controllerDefaultValue);

	return	(
		<Flex gap={'sm'} align={'center'} w={'100%'} justify={'stretch'} direction={props.reversed ? 'row-reverse' : 'row'}>
			{
				props.port && <Port {...props.port} />
			}
			<Text>
				{!props.hideLabel && props.label}
			</Text>
			{
				(controllerValue !== undefined && props.controller && props.port?.type !== 'execution') ? props.controller(controllerValue, setControllerValue) : null
			}
		</Flex>
	);
}
