import {type Value} from './common/classes/Value';

export type Connection = {
	id: string;
	fromId: string;
	toId: string;

	fromPort: string;
	toPort: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type IO = 'input' | 'output';
export type UnknownJson = string | number | boolean | undefined | UnknownJson[] | {[key: string]: UnknownJson};
export type ClassConstructor<T> = new (...args: any[]) => T;
export type Color = `#${string}`;
export type PortTypes = 'execution' | 'data';
export type DataType = Value<any>;
export type NonArrayDataType = Value<any, false>;
