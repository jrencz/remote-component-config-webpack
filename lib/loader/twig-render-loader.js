// This loader is based on webpack-twig-loader but instead of compiling it renders

var RemoteComponentConfigWebpackPlugin = require('../plugin/remoteComponentConfigPlugin');
var loaderUtils = require("loader-utils");
var path = require("path");
var Twig = require("twig");

function isRemoteComponentConfig (plugin) {
  return plugin instanceof RemoteComponentConfigWebpackPlugin
}

// transform context stored in plugin into context suitable for rendering (array -> object)
function arrayByNameContextReducer (context, componentDescriptor) {
  context[componentDescriptor.name] = componentDescriptor.data;

  return context;
}

Twig.cache(false);


var context;

module.exports = function (source, map) {
  var query = loaderUtils.parseQuery(this.query);
  var configKey = query.config || "twigRenderLoader";

  this.cacheable && this.cacheable();

  var id = loaderUtils.stringifyRequest(this, path.relative(process.cwd(), this.resource));
  var remoteConfigReducer = this.options[configKey].remoteConfigReducer ||
    arrayByNameContextReducer;

  // Context is shared for all files so it can be cached in memory.
  if (!context) {
    context = this
        .options
        .plugins
        .filter(isRemoteComponentConfig)
        .shift()
        .remoteConfig
        .reduce(remoteConfigReducer, {});
  }

  var callback = this.async();
  var rendered = Twig
    .twig({
      id: id,
      data: source,
      allowInlineIncludes: true
    })
    .render(context);

  callback(null, 'module.exports = ' + JSON.stringify(rendered), map);
};
