require('babel/register')({
  only: /\.jsx$/,
  optional: [
    'runtime',
    'es7.classProperties',
    'es7.decorators',
    'es7.objectRestSpread',
  ],
});
require('./gulpfile.jsx');
