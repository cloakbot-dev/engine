import {NumberValue} from '../values/NumberValue';
import {Input, type InputProps} from '@mantine/core';
import React from 'react';
import {Controller} from '../classes/Controller';

export class NumberController<T extends NumberValue<false>> extends Controller<T, InputProps> {
	override render(): React.FC {
		return () => {
			const [value, setValue] = React.useState(this.value.value);
			return <Input value={value ?? 0} type={'number'} onChange={v => {
				setValue(v.currentTarget.valueAsNumber);
				this.update(new NumberValue<false>(v.currentTarget.valueAsNumber) as T);
			}} {...this.props}/>;
		};
	}
}

