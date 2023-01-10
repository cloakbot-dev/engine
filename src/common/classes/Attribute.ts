import _ from 'lodash';
import {type IO} from '../../types';
import {type Controller} from './Controller';
import {type Port} from './Port';

export class Attribute<T, Name extends Lowercase<string> = Lowercase<string>, Dir extends IO = IO> {
	label: string;
	port?: Port;
	fallbackValue?: T;
	controller?: Controller<T, any>;

	constructor(readonly name: Name, readonly direction: Dir) {
		this.label = _.camelCase(name);
	}

	setPort(port: Port | undefined) {
		this.port = port;
	}
}
