export type Connection = {
	fromId: string;
	toId: string;

	fromPort: string;
	toPort: string;
};

export type Node<T> = {
	id: string;
	position: {
		x: number;
		y: number;
	};
	selected: boolean;
	locked: boolean;
	immortal: boolean;
	data: T;
};

export type UnknownJson = string | number | boolean | undefined | UnknownJson[] | {[key: string]: UnknownJson};
export type ClassConstructor<T> = new (...args: any[]) => T;
export type Color = `#${string}`;
export type PortTypes = 'execution' | 'data';
// eslint-disable-next-line @typescript-eslint/naming-convention
export type IO = 'input' | 'output';
