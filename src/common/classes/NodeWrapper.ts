/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable new-cap */
import {Type} from 'class-transformer';
import {type NodeWrapper} from '../../types';
import {NodeData} from './Node';

export class NodeWrapperClass<T extends NodeData> implements NodeWrapper<T> {
	id = '';
	position: {
		x: number;
		y: number;
	} = {x: 0, y: 0};

	selected = false;
	locked = false;
	immortal = false;
	@Type(() => NodeData) data: T;

	constructor(options?: NodeWrapper<T>) {
		this.id = options?.id ?? '';
		this.position = options?.position ?? {x: 0, y: 0};
		this.selected = options?.selected ?? false;
		this.locked = options?.locked ?? false;
		this.immortal = options?.immortal ?? false;
		this.data = options?.data ?? new NodeData('') as unknown as T;
	}
}
