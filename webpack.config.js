
module.exports = {
  entry: __dirname + '/src/index.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module:  {
    rules: [
      {
          test: /\.jsx$/,
          exclude: /(node_modules|bower_components|example|dist)/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env', '@babel/react']
            }
          }
      },
    ]
  },
  externals: {
    'react': 'umd react' 
  }
};