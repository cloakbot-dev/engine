import {type DataType, type PortTypes} from '../../types';

export class Port<IsArray extends boolean = false, IsNullable extends boolean = false> {
	isArray: IsArray;
	isNullable: IsNullable;
	constructor(readonly type: PortTypes, readonly datatype: DataType) {
		this.isArray = false as IsArray;
		this.isNullable = false as IsNullable;
	}

	setNullable<T extends boolean>(nullable: T) {
		this.isNullable = nullable as unknown as IsNullable;
		return this as unknown as Port<IsArray, T>;
	}

	setArray<T extends boolean>(array: T) {
		this.isArray = array as unknown as IsArray;
		return this as unknown as Port<T, IsNullable>;
	}
}
