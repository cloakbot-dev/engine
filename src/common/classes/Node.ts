import {Exclude, instanceToPlain} from 'class-transformer';
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/parameter-properties */
import {plainToClass, Transform} from 'class-transformer';
import _ from 'lodash';
import {type Color, type DataType, type IO} from '../../types';
import {type ExecutionContext} from '../Engine';
import {NullValue} from '../values/NullValue';
import {Attribute} from './Attribute';
import {Port} from './Port';

export class NodeData<Name extends Lowercase<string> = Lowercase<string>, Attributes extends Map<string, Attribute<any>> = Map<string, Attribute<any>>> {
	label: string;
	color: Color = '#1062e6';
	accentColor: Color = '#ffffff';
	@Transform(value => {
		const map = new Map<string, Attribute<any>>();
		for (const entry of Object.entries(value.value)) {
			map.set(entry[0], plainToClass(Attribute, entry[1]));
		}

		return map;
	}, {toClassOnly: true})
	@Transform((value: any) => {
		const attributes: Record<string, Record<string, unknown>> = {};

		for (const entry of (value.value as Map<string, Attribute<any>>).entries()) {
			console.log(entry[0], entry[1]);
			attributes[entry[0]] = instanceToPlain(entry[1]);
		}

		return attributes;
	}, {toPlainOnly: true}) attributes: Attributes;

	@Exclude() handlers = new Map<string, (ctx: ExecutionContext) => void>();

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

	getPort(name: string) {
		return this.attributes.get(name)?.port;
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

	handle<K extends Lowercase<string>>(name: K, handler: (ctx: ExecutionContext) => void) {
		if (this.attributes.has(name)) {
			const attr = this.attributes.get(name);

			if (attr?.direction !== 'input') {
				throw new Error(`Attribute ${name} is not an input`);
			}

			if (attr?.port?.type !== 'execution') {
				throw new Error(`Attribute ${name} is not an execution port`);
			}

			this.handlers.set(name, handler);
			return this;
		}

		throw new Error(`Attribute ${name} does not exist on node ${this.name}`);
	}

	addInputExecution() {
		return this.addAttribute(new Attribute('execution-in', 'input').setPort(new Port('execution', new NullValue())));
	}

	addOutputExecution() {
		return this.addAttribute(new Attribute('execution-out', 'output').setPort(new Port('execution', new NullValue())));
	}
}

