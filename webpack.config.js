const { resolve } = require('path');
const Dotenv = require('dotenv-webpack');
// const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, HotModuleReplacementPlugin } = require('webpack');

const config = {
  context: resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@store': resolve(__dirname, 'src/store'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@images': resolve(__dirname, 'src/images'),
      '@helpers': resolve(__dirname, 'src/helpers'),
    },
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  plugins: [
    new Dotenv(),
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    // }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
    new ProvidePlugin({ React: 'react' }),
  ],
  module: {
    rules: [
      { test: /\.ts$|tsx/, use: ['babel-loader'] },
      { test: /\.(woff2|svg)$/, use: ['file-loader'] },
    ],
  },
};

module.exports = config;
