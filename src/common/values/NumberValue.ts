import {type Color} from '../../types';

export class NumberValue<T extends boolean> extends Value<number, T> {
	static default(): Value<number> {
		return new Value<number>('number', 0);
	}

	__type = NumberValue.name;

	override get color(): Color {
		return '#6675ff';
	}

	constructor(value: number) {
		super('number', value);
	}
}

import {Value} from './../classes/Value';
