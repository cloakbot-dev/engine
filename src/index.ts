import {decompress} from 'compressed-json';
import 'reflect-metadata';
import {Attribute} from './common/classes/Attribute';
import {NodeData} from './common/classes/Node';
import {Engine} from './common/Engine';

const engine = new Engine();
const mathNode = new NodeData('math')
	.addAttribute(new Attribute('a', 'input'))
	.addAttribute(new Attribute('b', 'input'))
	.addAttribute(new Attribute('result', 'output'))
	.addInputExecution()
	.addOutputExecution();

engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);
engine.addNode(mathNode);

const raw = engine.serialize();
const uncompressed = JSON.stringify(decompress(JSON.parse(raw))).length;
console.log(`Compressed: ${raw.length}`);
console.log(`Uncompressed: ${uncompressed}`);
console.log(`Compression ratio: ${(raw.length / uncompressed * 100).toFixed(2)}%`);
