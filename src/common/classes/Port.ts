import {type DataType, type PortTypes} from '../../types';

export class Port {
	nullable = false;
	array = false;
	constructor(readonly type: PortTypes, readonly datatype: DataType) { }

	setNullable(nullable: boolean) {
		this.nullable = nullable;
	}

	setArray(array: boolean) {
		this.array = array;
	}
}
