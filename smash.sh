node_modules/smash/smash \
  d3/src/start.js \
  d3/src/interpolate/index.js \
  d3/src/end.js \
| sed s/"!function(){"/"!function(){ var window = {}; var document = {}; var d3_document = { documentElement: {}};"/ > smash/d3.js
