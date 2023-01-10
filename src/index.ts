import 'reflect-metadata';
import {Attribute} from './common/classes/Attribute';
import {NodeData} from './common/classes/Node';

const node = new NodeData('math').addAttribute(new Attribute('abc', 'output')).addAttribute(new Attribute('def', 'output'));