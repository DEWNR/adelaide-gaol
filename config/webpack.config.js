const { isDevEnv } = require('./node-env');
const path = require('path');

module.exports = {
  entry: {
    main: '../src/javascript/main.js',
    plugins: '../src/javascript/plugins.js'
  },
  output: {
    filename: '[name].js'
  },
  devtool: isDevEnv ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
