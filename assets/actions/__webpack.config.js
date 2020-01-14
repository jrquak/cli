const path = require('path');

module.exports = {
  entry: './functionOne/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.webpack.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }]
  }
};
