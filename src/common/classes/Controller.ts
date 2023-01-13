/* eslint-disable new-cap */

import {Type} from 'class-transformer';
import React from 'react';
import {type NonArrayDataType} from '../../types';
import {StringValue} from '../values/StringValue';
import {Value} from './Value';

export class Controller<T extends NonArrayDataType, Props> {
	@Type(() => Value, {
		discriminator: {
			property: '__type',
			subTypes: [
				{value: StringValue, name: 'StringValue'},
			],
		},
	}) value: T;

	props?: Props = undefined;

	readonly type: T['type'];

	constructor(defaultValue: T) {
		this.value = defaultValue;
		this.type = defaultValue.type;
	}

	setProps(props: Props) {
		this.props = props;
		return this;
	}

	update(value: T) {
		console.log(value);
		this.value = value;
	}

	render(): React.FC {
		return () => React.createElement(React.Fragment, {}, 'No render function defined');
	}
}
