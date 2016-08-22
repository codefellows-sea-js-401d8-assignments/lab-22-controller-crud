'use strict';

const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const API_URL = JSON.stringify(process.env.API_URL || 'http://localhost:3000');

let plugins = [
  new ExtractText('bundle.css'),
  new webpack.DefinePlugin({
    __API_URL__: API_URL,
  }),
];

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  plugins: plugins,
  postcss: function() {
    return [autoprefixer];
  },
  sassLoader: {
    includePaths: [`${__dirname}/app/style/scss`],
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractText.extract('style', 'css!postcss!sass!'),
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.(jpg|gif)$/,
        loader: 'file?name=img/[hash]-[name].[ext]',
      },
      {
        test: /\.(woff|svg|eot|ttf).*/,
        loader: 'url?limit=10000&name=font/[name].[ext]',
      },
    ],
  },
};
