/* eslint-disable new-cap */

import {Type} from 'class-transformer';
import React from 'react';
import {type NonArrayDataType} from '../../types';
import {NullValue} from '../values/NullValue';
import {NumberValue} from '../values/NumberValue';
import {StringValue} from '../values/StringValue';
import {Value} from './Value';

export class Controller<T extends NonArrayDataType, Props> {
	@Type(() => Value, {
		discriminator: {
			property: '__type',
			subTypes: [
				{value: StringValue, name: 'StringValue'},
				{value: NumberValue, name: 'NumberValue'},
				{value: NullValue, name: 'NullValue'},
			],
		},
		keepDiscriminatorProperty: true,
	}) value: T;

	props?: Props = undefined;

	readonly type: T['type'];

	constructor(defaultValue: T) {
		this.value = defaultValue;
		this.type = defaultValue?.type;
	}

	setProps(props: Props) {
		this.props = props;
		return this;
	}

	update(value: T) {
		this.value = value;
	}

	render(): React.FC {
		return () => React.createElement(React.Fragment, {}, 'No render function defined');
	}
}
