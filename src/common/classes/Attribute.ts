import _ from 'lodash';
import {type IO} from '../../types';
import {type Port} from './Port';

export class Attribute {
	label: string;
	port?: Port;

	constructor(readonly name: Lowercase<string>, readonly direction: IO) {
		this.label = _.camelCase(name);
	}

	setPort(port: Port | undefined) {
		this.port = port;
	}
}
