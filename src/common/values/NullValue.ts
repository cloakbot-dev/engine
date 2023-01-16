import {type Color} from '../../types';

export class NullValue<T extends boolean> extends Value<string, T> {
	static default(): Value<number> {
		return new Value<number>('null', 0);
	}

	__type = NullValue.name;

	override get color(): Color {
		return '#ffffff';
	}

	constructor() {
		super('null', '');
	}
}

import {Value} from '../classes/Value';
