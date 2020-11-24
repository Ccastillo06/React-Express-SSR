/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, args) => ({
  mode: args.mode || 'development',

  target: 'node',

  entry: './src/server/index.js',

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, './dist'),
  },

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [/src\/__tests__\//, /node_modules/],
        include: /src/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        include: /src/,
        loaders: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },

  plugins: [new CopyWebpackPlugin({ patterns: [{ from: 'src/assets', to: 'assets' }] })],

  externals: [webpackNodeExternals()],
});
