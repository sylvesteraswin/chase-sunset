const webpack = require('webpack');
const path = require('path');

module.exports = [
  {
    context: path.join(__dirname),
    entry: 'index',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style-loader!css-loader?-svgo' },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.join(__dirname, 'src', 'client'), 'node_modules'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // strictly development
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  },
];
