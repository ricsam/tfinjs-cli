/* global __REAL_MODULE__ */
import 'source-map-support/register';
import { requiredParam } from '@tfinjs/api/utils';
import commander from 'commander';
import { resolve, isAbsolute } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import MemoryFS from 'memory-fs';
import pgk from '../../package.json';
import build from '../build/index';
// import { readFileSync } from 'fs';

const fs = new MemoryFS();

const requireFromString = (src, filename) => {
  /* eslint-disable no-underscore-dangle */
  const m = new __REAL_MODULE__.constructor();
  m.paths = __REAL_MODULE__.paths;
  m._compile(src, filename);
  return m.exports;
  /* eslint-enable no-underscore-dangle */
};

const parseCliInputPath = (rawDir) => {
  const dir = rawDir || '.';
  if (!isAbsolute(dir)) {
    return resolve(process.cwd(), dir);
  }
  return dir;
};

commander.version(pgk.version);

commander
  .command('build <entryFile>')
  .description(
    'Transpiles the javascript files into a single file exporting a deployment instance',
  )
  .option('-o --output <outputFolder>', 'output path', parseCliInputPath)
  .action((entry, { output = requiredParam('output') }) => {
    const entryFile = parseCliInputPath(entry);
    const compiler = webpack({
      entry: entryFile,
      devtool: 'inline-source-map',
      output: {
        path: '/',
        filename: 'index.js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2',
      },
      target: 'node',
      node: false,
      externals: nodeExternals(),
      mode: 'production',
    });
    compiler.outputFileSystem = fs;
    compiler.run((err, stats) => {
      // Read the output later:

      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
      console.log(
        stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true, // Shows colors in the console
        }),
      );

      const content = fs.readFileSync('/index.js');
      const contentWithSourceMapSupport = `require('source-map-support').install();\n${content}`;
      const deployment = requireFromString(
        contentWithSourceMapSupport,
        entryFile,
      );
      build(deployment, { output });
      // console.log(deployment.getResources()[0].getUri());
    });
  });

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}

commander.parse(process.argv);
