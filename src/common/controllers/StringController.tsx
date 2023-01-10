import {Input, type InputProps} from '@mantine/core';
import {type ReactNode} from 'react';
import {Controller} from '../classes/Controller';

export class StringController extends Controller<string, InputProps> {
	override render(props: InputProps): ReactNode {
		return <>
			<Input w={'100%'} value={this.value} onChange={event => {
				this.update(event.currentTarget.value);
			}} {...props} />
		</>;
	}
}
