import {Input, type InputProps} from '@mantine/core';
import React from 'react';
import {Controller} from '../classes/Controller';
import {StringValue} from '../values/StringValue';

export class StringController<T extends StringValue<false>> extends Controller<T, InputProps> {
	override render(): React.FC {
		return () => {
			const [value, setValue] = React.useState(this.value.value);
			return <Input value={value ?? 0} type={'text'} onChange={v => {
				setValue(v.currentTarget.value);
				this.update(new StringValue<false>(v.currentTarget.value) as T);
			}} {...this.props}/>;
		};
	}
}

