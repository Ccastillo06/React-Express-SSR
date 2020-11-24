/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, args) => {
  const isProd = args.mode === 'production';

  return {
    mode: args.mode || 'development',

    entry: {
      app: './src/client/index.js',
    },

    output: {
      // For more info about filename vs chunkFilename check out https://github.com/webpack-contrib/mini-css-extract-plugin/issues/36#issuecomment-372721883
      // @TODO Add assets-webpack-plugin to support SSR and hash generation
      // filename: isProd ? '[name].[hash].bundle.js' : '[name].bundle.js',
      // chunkFilename: isProd ? '[id].[hash].bundle.js' : '[id].bundle.js',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
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
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                ...(isProd ? {} : { sourceMap: true }),
              },
            },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(scss|sass|css)$/,
          include: /node_modules/,
          exclude: /src/,
          loaders: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['*', '.js', '.jsx', '.css', '.scss'],
    },

    plugins: [
      new MiniCssExtractPlugin({
        // @TODO Add assets-webpack-plugin to support SSR and hash generation
        // filename: isProd ? '[name].[hash].css' : '[name].css',
        // chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
        filename: '[name].css',
        chunkFilename: '[name].css',
      }),
    ],

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },
  };
};
