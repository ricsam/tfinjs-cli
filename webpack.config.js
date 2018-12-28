const { readFileSync } = require('fs');
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    resolve(__dirname, 'src/cli/index.js'),
  ],
  devtool: 'inline-source-map',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'tfinjs.js',
    library: 'tfinjs',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: nodeExternals(),
  node: {
    module: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(readFileSync(resolve(__dirname, '.babelrc'))),
        },
      },
    ],
  },
};
