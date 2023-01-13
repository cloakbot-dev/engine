/* eslint-disable new-cap */
import {Type} from 'class-transformer';
import _ from 'lodash';
import {type NonArrayDataType, type DataType, type IO} from '../../types';
import {Controller} from './Controller';
import {Port} from './Port';

export class Attribute<T extends DataType, Name extends Lowercase<string> = Lowercase<string>, Dir extends IO = IO> {
	@Type(() => Port) port: Port<boolean> | undefined = undefined;
	@Type(() => Controller) controller?: T extends NonArrayDataType ? Controller<T, any> : never;
	label: string;
	nodeId: string | undefined = undefined;

	readonly name: Name;
	readonly direction: Dir;

	constructor(name: Name, direction: Dir) {
		this.label = _.camelCase(name);
		this.name = name;
		this.direction = direction;
	}

	setController(controller: T extends NonArrayDataType ? Controller<T, any> : never) {
		this.controller = controller;
		return this;
	}

	setPort(port: Port<boolean> | undefined) {
		this.port = port;
		return this;
	}
}
