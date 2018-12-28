import { relative, resolve } from 'path';

const namespace = (filename) => relative(resolve(__dirname, '../src'), filename);
export default namespace;
