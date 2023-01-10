/* eslint-disable @typescript-eslint/parameter-properties */
import {type ReactNode} from 'react';
import {type NonArrayDataType, type ClassConstructor} from '../../types';

export class Controller<T extends NonArrayDataType, Props> {
	value: T;
	props?: Props = undefined;

	readonly type: ClassConstructor<T>;

	constructor(type: ClassConstructor<T>, defaultValue: T) {
		this.value = defaultValue;
		this.type = type;
	}

	setProps(props: Props) {
		this.props = props;
		return this;
	}

	update(value: T) {
		console.log(value);
		this.value = value;
	}

	render(): ReactNode {
		return null;
	}
}
