import _ from 'lodash';
import {type Attribute} from './Attribute';

export class NodeData {
	label: string;
	attributes: Attribute[] = [];
	constructor(readonly name: Lowercase<string>) {
		this.label = _.camelCase(name);
	}
}
