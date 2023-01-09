const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [
    './src/index.js',
  ],
  output: {
    // Necessary for HTML 5 routes along with historyApiFallback.
    publicPath: '/',
    clean: true,
    filename: 'app.bundle.js',
    path: __dirname + '/dist',
  },
  devServer: {
    // Necessary for HTML 5 routes along with publicPath.
    historyApiFallback: true,
    // Can be used if warnings are still preventing webpack-dev-server from
    // allowing UI interaction due to warnings, but not preferred because we
    // really shouldn't be ignoring warnings.
    // client: {
    //   overlay: {
    //     warnings: false,
    //   },
    // },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // `options` here just becomes the Babel config itself.
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(svg|png)$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      // Can use useState without `import { useState } from 'react';`, though
      // not recommended.
      // useState: ['react', 'useState' ],
    }),
    new CopyPlugin({
      patterns: [
        // Note that the "to" is relative to the output dir.
        { from: 'public', to: '.', }
      ],
    }) ,
  ],
};