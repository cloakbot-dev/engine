import {Input, type InputProps} from '@mantine/core';
import React from 'react';
import {type ReactNode} from 'react';
import {Controller} from '../classes/Controller';
import {StringValue} from '../values/StringValue';
export class StringController extends Controller<StringValue<false>, InputProps> {
	constructor(defaultValue: StringValue<false> = StringValue.default()) {
		super(defaultValue);
	}

	override render(): ReactNode {
		const [value, setValue] = React.useState(this.value.value);

		return React.createElement(React.Fragment, {}, React.createElement(Input as any, {
			w: '100%',
			value,
			onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
				this.update(new StringValue(event.currentTarget.value ?? ''));
				setValue(event.currentTarget.value ?? '');
			},
			...this.props,
		}));
	}
}
