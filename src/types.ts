export type Connection = {
	fromId: string;
	toId: string;

	fromPort: string;
	toPort: string;
};

export type ClassConstructor<T> = new (...args: any[]) => T;

export type Color = `#${string}`;

export type PortTypes = 'execution' | 'data';
