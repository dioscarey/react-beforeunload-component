const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './app.jsx',
  module:  {
    rules: [
      {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components|public)/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env', '@babel/react']
            }
          }
      }, // ...
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      react: path.resolve("./node_modules/react"),
      BeforeUnloadCompnent: path.resolve(__dirname, './../../dist/'),
    }
  },
  output: {
    path: path.resolve(__dirname, 'public'),  
    publicPath: '/',    
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
  }
};