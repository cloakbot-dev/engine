import _ from 'lodash';
import {type Attribute} from './Attribute';

export class NodeData {
	label: string;
	attributes: Record<string, Attribute> = {};
	constructor(readonly name: Lowercase<string>) {
		this.label = _.camelCase(name);
	}

	addAttribute(attribute: Attribute) {
		this.attributes[attribute.name] = attribute;
	}
}
