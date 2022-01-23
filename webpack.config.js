const paths = require('path');

module.exports = {
  entry: require.resolve('./index.js'),
  output: {
    filename: './dist/uwu-toolkit.js',
    path: paths.resolve(__dirname, ''),
    library: 'uwuTK',
    libraryTarget: 'umd',
  },
  target: 'web',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
