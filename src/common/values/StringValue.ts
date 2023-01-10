import {Value} from '../classes/Value';

export class StringValue<IsArray extends boolean = boolean> extends Value<string, IsArray> {
	static default(): Value<string, false> {
		return new Value<string, false>('string', '');
	}

	constructor(value: string) {
		super('string', value);
	}
}
