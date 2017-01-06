var glob = require('glob');
var fs = require('fs');
var path = require('path');
var json5 = require('json5');

function resolvePathInRoot(root) {
  return function (componentDescriptionPath) {
    return path.resolve(root, componentDescriptionPath);
  }
}

function toName(cwdPath) {
  return json5.parse(fs.readFileSync(cwdPath)).name
}

function findComponents(options) {
  var root = 'root' in options ?
    options.root :
    process.cwd();

  var dot = 'dot' in options ?
    options.dot :
    true;

  return glob
    .sync(options.pattern, {
      dot: dot,
      root: root
    })
    .map(resolvePathInRoot(root))
    .map(toName);
}

module.exports = findComponents;
