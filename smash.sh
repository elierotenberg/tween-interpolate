mkdir -p dist
node_modules/smash/smash \
  node_modules/d3/src/start.js \
  node_modules/d3/src/interpolate/index.js \
  node_modules/d3/src/end.js \
| sed s/"!function(){"/"!function(){ var window = {}; var document = {}; var d3_document = { documentElement: {}};"/ > dist/index.js
