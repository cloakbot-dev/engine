import {type ReactNode} from 'react';

export class Controller<T, Props> {
	value: T;

	constructor(defaultValue: T) {
		this.value = defaultValue;
	}

	update(value: T) {
		this.value = value;
	}

	render(_?: Props): ReactNode {
		return null;
	}
}
