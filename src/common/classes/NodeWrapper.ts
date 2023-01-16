import {NodeData} from './Node';
import {type CoordinateExtent, type Position, type XYPosition, type Node} from 'reactflow';
import {type CSSProperties} from 'react';
import {type CustomNodeProps} from '../../components/reactflow/CustomNode';
import {Type} from 'class-transformer';

export class NodeWrapper implements Node<NodeData> {
	static from(props: CustomNodeProps) {
		return new NodeWrapper({
			data: props.data,
			id: props.id,
			position: {
				x: props.xPos,
				y: props.yPos,
			},
			type: props.type,
			selected: props.selected,
			dragging: props.dragging,
		});
	}

	// eslint-disable-next-line new-cap
	@Type(() => NodeData) data: NodeData;
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

	constructor(props: Node<NodeData>) {
		this.data = props?.data ?? new NodeData('');
		this.id = props?.id ?? '';
		this.position = props.position;
		this.type = 'custom';
	}
}
