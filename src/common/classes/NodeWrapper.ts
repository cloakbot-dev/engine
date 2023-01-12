
/* eslint-disable new-cap */

import {Type} from 'class-transformer';
import {NodeData} from './Node';
import {type CoordinateExtent, type Position, type XYPosition, type Node} from 'reactflow';
import {type CSSProperties} from 'react';
import {type CustomNodeProps} from '../../components/reactflow/CustomNode';

export class NodeWrapper<T extends NodeData> implements Node<T> {
	@Type(() => NodeData) data: T;
	id: string;
	position: XYPosition;
	type?: string | undefined;
	style?: CSSProperties | undefined;
	className?: string | undefined;
	sourcePosition?: Position | undefined;
	targetPosition?: Position | undefined;
	hidden?: boolean | undefined;
	selected?: boolean | undefined;
	dragging?: boolean | undefined;
	draggable?: boolean | undefined;
	selectable?: boolean | undefined;
	connectable?: boolean | undefined;
	deletable?: boolean | undefined;
	dragHandle?: string | undefined;
	width?: number | undefined | undefined;
	height?: number | undefined | undefined;
	parentNode?: string | undefined;
	zIndex?: number | undefined;
	extent?: 'parent' | CoordinateExtent | undefined;
	expandParent?: boolean | undefined;
	positionAbsolute?: XYPosition | undefined;
	ariaLabel?: string | undefined;
	focusable?: boolean | undefined;
	resizing?: boolean | undefined;

	constructor(props: CustomNodeProps) {
		this.data = props.data as T;
		this.id = props.id;
		this.position = {x: props.xPos, y: props.yPos};
	}
}
