var plugin = require('./lib/plugin/remoteComponentConfigPlugin');
var twigRender = require('./lib/loader/twig-render-loader');

module.exports = {
  plugin: plugin,
  loaders: {
    twigRender: twigRender
  }
};
