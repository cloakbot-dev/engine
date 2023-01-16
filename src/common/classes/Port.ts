import {NumberValue} from './../values/NumberValue';
import {Type} from 'class-transformer';
import {type Color, type DataType, type PortTypes} from '../../types';
import {StringValue} from '../values/StringValue';
import {Value} from './Value';

export class Port<IsNullable extends boolean = false, Type extends PortTypes = PortTypes> {
	nullable: IsNullable;
	color: Color = '#ffffff';
	type: Type;
	// eslint-disable-next-line @typescript-eslint/member-ordering, new-cap
	@Type(() => Value, {
		discriminator: {
			property: '__type',
			subTypes: [
				{
					name: 'string',
					value: StringValue,
				},
				{
					name: 'number',
					value: NumberValue,
				},
			],
		},
	}) readonly datatype: Type extends 'execution' ? undefined : DataType;

	constructor(type: Type, datatype: Type extends 'execution' ? undefined : DataType) {
		this.nullable = false as IsNullable;
		this.type = type;
		this.datatype = datatype;
	}

	setColor(c: Color) {
		this.color = c;
	}

	setNullable<T extends boolean>(nullable: T) {
		this.nullable = nullable as unknown as IsNullable;
		return this as unknown as Port<T>;
	}
}
