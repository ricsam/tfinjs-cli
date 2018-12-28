import { relative } from 'path';

const namespace = (filename) => {
  return relative(__dirname, filename);
};
export default namespace;

