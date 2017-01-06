var fetchComponentData = require('./../util/fetchRemoteConfig');

function RemoteComponentConfigWebpackPlugin (config) {
  this.componentsPattern = config.componentsPattern;
  this.endpointUriTemplate = config.endpointUriTemplate;
}

RemoteComponentConfigWebpackPlugin.prototype.apply = function (compiler) {
  var pluginInstance = this;

  function run (__compiler, callback) {
    fetchComponentData({
      componentsPattern: this.componentsPattern,
      endpointUriTemplate: this.endpointUriTemplate
    })
      .then(function (remoteConfig) {
        Object.assign(pluginInstance, {
          remoteConfig: remoteConfig
        });
      })
      .then(callback, callback)
  }

  compiler.plugin('watch-run', run);
  compiler.plugin('run', run);
};

module.exports = RemoteComponentConfigWebpackPlugin;
