import _ from 'lodash';
import {type IO} from '../../types';
import {type Attribute} from './Attribute';

export class NodeData<Name extends Lowercase<string> = Lowercase<string>, Attributes extends Record<string, Attribute<any>> = Record<string, Attribute<any>>> {
	label: string;
	attributes: Attributes;

	constructor(readonly name: Name) {
		this.label = _.camelCase(name);
		this.attributes = {} as unknown as Attributes;
	}

	addAttribute<T, N extends Lowercase<string>, D extends IO>(attribute: Attribute<T, N, D>) {
		(this.attributes as Record<string, Attribute<any>>)[attribute.name] = attribute;
		return this as unknown as NodeData<Name, Attributes & Record<N, Attribute<T, N, D>>>;
	}

	getAttributes<Dir extends IO>(direction: Dir) {
		return _.pickBy(this.attributes, attribute => attribute.direction === direction) as {
			[key in keyof Attributes as Attributes[key]['direction'] extends Dir ? key : never]: Attributes[key]['direction'] extends Dir ? Attributes[key] : never
		};
	}
}

