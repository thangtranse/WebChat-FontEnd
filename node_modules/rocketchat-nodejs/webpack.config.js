var nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'eval-source-map',
  context: __dirname + '/src',
  entry: {
    Client: './Client',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].compiled.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  target: 'node',
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
};
