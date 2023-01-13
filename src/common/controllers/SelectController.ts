import {Select, type SelectProps} from '@mantine/core';
import React from 'react';
import {Controller} from '../classes/Controller';
import {type StringValue} from '../values/StringValue';

export class SelectController<T extends StringValue<false>> extends Controller<T, SelectProps> {
	options: Array<{value: T; label: string}> = [];
	constructor(options: Array<{value: T; label: string}>, defaultValue: T = options[0].value) {
		super(defaultValue);
		this.options = options;
	}

	override render(): React.FC {
		return () => {
			const [value, setValue] = React.useState(this.value);
			return React.createElement(React.Fragment, {}, React.createElement(Select as any, {
				data: this.options.map(option => ({label: option.label, value: option.value.value})),
				value: value.value,
				className: 'nodrag',
				onChange: (v: string) => {
					console.log(v);
					const value = this.options.find(option => option.value.value === v);
					if (value) {
						this.update(value.value);
						setValue(value.value);
					}
				},
				...this.props,
			}));
		};
	}
}
