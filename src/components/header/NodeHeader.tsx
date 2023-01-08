import {Divider, Flex, Space, Text} from '@mantine/core';
import React from 'react';
import {type Color} from '../../types';
import {type TablerIcon} from '@tabler/icons';
import Port, {type PortProps} from '../pins/Port';

export type NodeHeaderProps = {
	title: string;
	icon?: TablerIcon;
	color?: Color;
	accentColor?: Color;

	leftPort?: Omit<PortProps, 'type'>;
	rightPort?: Omit<PortProps, 'type'>;
};

export default function NodeHeader(
	props: NodeHeaderProps,
) {
	const c: Color = props.color ?? '#0352fc';
	return (
		<Flex
			w={'100%'}
			justify={'stretch'}
			sx={theme => ({
				userSelect: 'none',
				background: theme.fn.linearGradient(60, c, theme.fn.rgba(c, 0.1)),
			})}>
			<Flex p={'sm'} align={'center'} w={'100%'}>
				<>
					{props.leftPort && <Port {...props.leftPort} color={props.leftPort?.color ?? props.accentColor} type={'execution'} />}

					<Divider
						labelPosition={'center'}
						label={
							<>
								{props.icon && React.createElement(props.icon, {
									color: props.accentColor ?? '#ffffff',
									size: 20,
								})}
								<Space w={'xs'} />
								<Text fz={'lg'} color={props.accentColor ?? '#ffffff'}>
									{props.title}
								</Text>
							</>
						}
						color={props.accentColor} mx={'sm'} style={{
							flexGrow: 1,
						}}/>

				</>
				{props.rightPort && <Port {...props.rightPort} color={props.rightPort?.color ?? props.accentColor} type={'execution'} />}
			</Flex>

		</Flex>
	);
}
