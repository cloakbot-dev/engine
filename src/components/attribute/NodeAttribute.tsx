import React from 'react';
import {Flex, Text} from '@mantine/core';
import Port, {type PortProps} from '../pins/Port';
import {type Controller} from '../../common/classes/Controller';

export type NodeAttributeProps<T = any, Port extends PortProps = PortProps> = {
	name: string;
	label: string;
	hideLabel?: boolean;
	port?: Port;
	controller?: Controller<T, any>;
	controllerProps?: any;
	reversed?: boolean;
};

export default function NodeAttribute<T>(props: NodeAttributeProps<T>) {
	return	(
		<Flex gap={'sm'} align={'center'} w={'100%'} justify={'stretch'} direction={props.reversed ? 'row-reverse' : 'row'}>
			{
				props.port && <Port {...props.port} />
			}
			<Text>
				{!props.hideLabel && props.label}
			</Text>
			{
				props.controller?.render(props.controllerProps ?? {})
			}
		</Flex>
	);
}
