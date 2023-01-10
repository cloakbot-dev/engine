import 'reflect-metadata';
import {NodeData} from './common/classes/Node';
import {Engine} from './common/Engine';

const engine = new Engine();
engine.addNode(new NodeData('test'));

engine.canConnect('test', 'test', 'test', 'test');
