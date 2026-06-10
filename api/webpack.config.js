const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.ts',
  target: 'node',
  mode: 'development',
  stats: {
    errorDetails: true
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".json"]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
