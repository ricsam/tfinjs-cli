const fs = require('fs');
const path = require('path');

const fpath = path.join(__dirname, 'dist/tfinjs.js');

const content = fs.readFileSync(fpath);
fs.writeFileSync(
  fpath,
  `#!/usr/bin/env node\nvar __REAL_MODULE__ = module;\n${content}`,
);
