import {engineContext, type EngineContext} from '../../../components/EngineProvider';
import {NumberValue} from '../../values/NumberValue';
import {Button, type ButtonProps} from '@mantine/core';
import React from 'react';
import {Controller} from '../../classes/Controller';

export class ButtonController<T extends NumberValue<false>> extends Controller<T, ButtonProps> {
	onClick: ((ctx: EngineContext) => void) | undefined;
	constructor(onClick: (ctx: EngineContext) => void) {
		super(new NumberValue(0) as T);
		this.onClick = onClick;
	}

	override render(): React.FC {
		return () => {
			const ctx = React.useContext(engineContext);
			return <Button {...this.props} onClick={() => {
				if (this.onClick) {
					this.onClick(ctx!);
				} else {
					console.warn('ButtonController.onClick is undefined');
				}
			}} />;
		};
	}
}

