import React from 'react';
import {type NodeData} from '../../common/classes/Node';
import {NodeWrapper} from '../../common/classes/NodeWrapper';
import NodeComponent from '../Node';
export type CustomNodeProps = {
	id: string;
	data: NodeData;
	type: string;
	xPos: number;
	yPos: number;
	zIndex: number;
	selected: boolean;
	sourcePosition: string;
	targetPosition: string;
	dragging: boolean;
	isConnectable: boolean;
	dragHandle: string;
};

export default function CustomNode(props: CustomNodeProps) {
	if (!props.data) {
		return <div>):</div>;
	}

	return (
		<NodeComponent node={new NodeWrapper(props)} selected={props.selected} dragging={props.dragging} />
	);
}
