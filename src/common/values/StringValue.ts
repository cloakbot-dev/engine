import {type Color} from '../../types';

export class StringValue<T extends boolean> extends Value<string, T> {
	static default(): Value<string, false> {
		return new Value<string, false>('string', '');
	}

	__type = StringValue.name;
	override get color(): Color {
		return '#0394fc';
	}

	constructor(value: string) {
		super('string', value);
	}
}

import {Value} from '../classes/Value';
