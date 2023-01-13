import {type Color} from '../../types';
import {Value} from '../classes/Value';

export class StringValue<IsArray extends boolean = boolean> extends Value<string, IsArray> {
	static default(): Value<string, false> {
		return new Value<string, false>('string', '');
	}

	override get color(): Color {
		return '#0394fc';
	}

	constructor(value: string) {
		super('string', value);
	}
}
