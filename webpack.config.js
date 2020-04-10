
module.exports = {
  entry: __dirname + '/src/index.jsx',
  module:  {
    rules: [
      {
          test: /\.jsx$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env', '@babel/react']
            }
          }
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index.js'
  }
};