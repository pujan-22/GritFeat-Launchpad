import { DocumentTemplate } from './implementation';

const original = new DocumentTemplate('Original', 'Content', 'Footer');
const clone = original.clone();
clone.title = 'Clone';

console.log(original);
console.log(clone);