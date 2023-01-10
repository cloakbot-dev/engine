/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/member-ordering */
import {Type} from 'class-transformer';
import {type Color, type DataType, type PortTypes} from '../../types';

export class Port<IsNullable extends boolean = false, Type extends PortTypes = PortTypes> {
	nullable: IsNullable;
	color: Color = '#ffffff';
	@Type(() => Type) type: Type;
	readonly datatype: Type extends 'execution' ? undefined : DataType;

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
