const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack(config);

console.log('Starting browser pack build...');
compiler.run((err, result) => {
  if (err) {
    console.error(result.toString());
    console.error('Browser pack build unsuccessful.');
    process.exit(1);
  }
  console.log(result.toString());
  console.log('Browser pack build successful.')
  process.exit(0);
});
