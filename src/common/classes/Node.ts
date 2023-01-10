/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/parameter-properties */
import {Type} from 'class-transformer';
import _ from 'lodash';
import {type Color, type DataType, type IO} from '../../types';
import {Attribute} from './Attribute';
import {Port} from './Port';

export class NodeData<Name extends Lowercase<string> = Lowercase<string>, Attributes extends Map<string, Attribute<any>> = Map<string, Attribute<any>>> {
	label: string;
	color: Color = '#1062e6';
	accentColor: Color = '#ffffff';
	@Type(() => Attribute) attributes: Attributes;

	readonly name: Name;

	constructor(name: Name) {
		this.name = name;
		this.label = _.capitalize(name);
		this.attributes = new Map<string, Attribute<any>>() as Attributes;
	}

	setColors(primary: Color, accent: Color) {
		this.color = primary;
		this.accentColor = accent;
		return this;
	}

	addAttribute<T extends DataType, N extends Lowercase<string>, D extends IO>(attribute: Attribute<T, N, D>) {
		this.attributes.set(attribute.name, attribute);
		return this as unknown as NodeData<Name, Attributes & Record<N, Attribute<T, N, D>>>;
	}

	getAttributes<Dir extends IO>(direction: Dir) {
		const attr = Object.fromEntries(this.attributes.entries());

		return _.pickBy(attr, attribute => attribute.direction === direction) as {
			[key in keyof typeof attr as typeof attr[key]['direction'] extends Dir ? key : never]: typeof attr[key]['direction'] extends Dir ? typeof attr[key] : never
		};
	}

	addInputExecution() {
		return this.addAttribute(new Attribute('execution-in', 'input').setPort(new Port('execution', undefined)));
	}

	addOutputExecution() {
		return this.addAttribute(new Attribute('execution-out', 'output').setPort(new Port('execution', undefined)));
	}
}

