import {Type} from 'class-transformer';
import {type Color, type DataType, type PortTypes} from '../../types';
import {Value} from './Value';
import {NullValue} from '../values/NullValue';
import {NumberValue} from '../values/NumberValue';
import {StringValue} from '../values/StringValue';

export class Port<IsNullable extends boolean = false, Type extends PortTypes = PortTypes> {
	nullable: IsNullable;
	color: Color = '#ffffff';
	type: Type;
	// eslint-disable-next-line @typescript-eslint/member-ordering, new-cap
	@Type(() => Value || undefined, {
		discriminator: {
			property: '__type',
			subTypes: [
				{value: StringValue, name: 'StringValue'},
				{value: NumberValue, name: 'NumberValue'},
				{value: NullValue, name: 'NullValue'},
			],
		},
	}) readonly datatype: Type extends 'execution' ? NullValue<any> : DataType = new NullValue();

	constructor(type: Type, datatype: Type extends 'execution' ? NullValue<false> : DataType) {
		this.nullable = false as IsNullable;
		this.type = type;
		if (datatype !== undefined) {
			this.datatype = datatype;
		}
	}

	setColor(c: Color) {
		this.color = c;
	}

	setNullable<T extends boolean>(nullable: T) {
		this.nullable = nullable as unknown as IsNullable;
		return this as unknown as Port<T>;
	}
}
