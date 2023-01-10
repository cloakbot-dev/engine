import {Value} from './../classes/Value';

export class NumberValue extends Value<number> {
	static default(): Value<number> {
		return new Value<number>('number', 0);
	}

	constructor(value: number) {
		super('number', value);
	}
}
