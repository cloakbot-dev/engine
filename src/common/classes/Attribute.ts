import {StringController} from './../controllers/StringController';
/* eslint-disable new-cap */
import {Type} from 'class-transformer';
import _ from 'lodash';
import {type NonArrayDataType, type DataType, type IO} from '../../types';
import {Controller} from './Controller';
import {Port} from './Port';
import {ButtonController} from '../controllers/output/ButtonController';
import {NumberController} from '../controllers/NumberController';

export class Attribute<T extends DataType, Name extends Lowercase<string> = Lowercase<string>, Dir extends IO = IO> {
	@Type(() => Port) port: Port<boolean> | undefined = undefined;
	@Type(() => Controller, {
		discriminator: {
			property: '__controller',
			subTypes: [
				{value: StringController, name: 'StringController'},
				{value: ButtonController, name: 'ButtonController'},
				{value: NumberController, name: 'NumberController'},
			],
		},
	}) controller?: T extends NonArrayDataType ? Controller<T, any> : never;

	label: string;
	nodeId: string | undefined = undefined;

	// eslint-disable-next-line @typescript-eslint/member-ordering
	@Type(() => String) readonly name: Name;
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
