import {type Color} from '../../types';

/* eslint-disable @typescript-eslint/parameter-properties  */
export class Value<T, IsArray extends boolean = boolean> {
	readonly type: Lowercase<string>;
	readonly value: T;
	readonly isArray: IsArray;
	get color(): Color {
		return '#ffffff';
	}

	constructor(type: Lowercase<string>, value: T, isArray: IsArray = false as IsArray) {
		this.type = type;
		this.value = value;
		this.isArray = isArray;
	}

	setArray<U extends boolean>(array: U) {
		return new Value<T, U>(this.type, this.value, array);
	}
}
