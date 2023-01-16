import {type NodeData} from '../common/classes/Node';

// Infinitely nestable caegories
type Category = {
	name: string;
	subCategories: Category[];
	nodes: Map<string, NodeData>;
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class NodeManager {
	static instance: NodeManager = new NodeManager();

	static nodes: Category = {
		name: 'uncategorized',
		subCategories: [],
		nodes: new Map<string, NodeData>(),
	};

	static addNode(node: NodeData, category: string) {
		const categories = category.split('/');

		let currentCategory = this.nodes;

		for (const category of categories) {
			const subCategory = currentCategory.subCategories.find(c => c.name === category);

			if (subCategory) {
				currentCategory = subCategory;
			} else {
				const newCategory: Category = {
					name: category,
					subCategories: [],
					nodes: new Map<string, NodeData>(),
				};

				currentCategory.subCategories.push(newCategory);
				currentCategory = newCategory;
			}
		}

		currentCategory.nodes.set(node.name, node);
	}

	static getNode(name: string) {
		const categories = name.split('/');
		const node = categories.pop();

		if (!node) {
			return null;
		}

		let currentCategory = this.nodes;

		for (const category of categories) {
			const subCategory = currentCategory.subCategories.find(c => c.name === category);

			if (subCategory) {
				currentCategory = subCategory;
			} else {
				return null;
			}
		}

		return currentCategory.nodes.get(node);
	}

	private constructor() {
		// Nothing
	}
}

import './math';
