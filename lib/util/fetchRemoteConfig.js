var fetch = require('node-fetch');
var uriTemplates = require('uri-templates');
var findComponents = require('./findComponents');

function fetchRemoteConfig(options) {
  var params = {
    components: findComponents({
      componentsPattern: options.componentsPattern
    }),
  };

  return fetch(uriTemplates(endpointUriTemplate).fillFromObject({
    params: params
  }))
    .then(function (response) {
      return response.json()
    });
}

module.exports = fetchRemoteConfig;
