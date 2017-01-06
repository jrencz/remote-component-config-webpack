# remote-component-config-webpack
Webpack tools for configuring Single Page Application components remotely

## Use cases

Primary use case is to allow configuring components of Single Page Application
via a content management system (or backend of any kind) which has an endpoint
for returning configuration objects. Configuration may be used according to
the project needs. One of cases already covered by this project is a loader for
pre-compiling Twig templates into Angular 1.x templates.


## Usage

In webpack.config.js:

```js
var RemoteComponentConfigWebpackPlugin = require('remote-component-config-webpack').Plugin;

module.exports = {
  /// ... rest of config
  plugins: [
    new RemoteComponentConfigWebpackPlugin({
      // how are the files containing component description named
      componentsPattern: '**/*.componentrc',
      // where to look for components in your project
      root: './src/',
      // What is the address of remote server endpoint which will return
      // component configuration.
      endpointUriTemplate: 'https://myserver.tld/components/{?params*}'
    })
  ]
}
```

## Configuration

### componentsPattern

_type_: string

Glob pattern. Passed to [`glob`](https://www.npmjs.com/package/glob)

### root

_type_: string

GLob matching root. Passed to [`glob`](https://www.npmjs.com/package/glob) as
`root`[option](https://www.npmjs.com/package/glob#options)

### endpointUriTemplate

_type_: string

This configuration is expected to be a [RFC 6570](https://tools.ietf.org/html/rfc6570)
string.

## How it works

Plugin hooks into Webpack compiler `run` and `watch-run` so it fetches
configuration every time you start compilation. It then exposes fetched
configuration onto the plugin instance for loaders to make use of.

__NOTE__: configuration fetching is a blocking operation. It will slow down
your build. There's no caching mechanism at the moment.

## How to make use of the fetched config

# Roadmap

Current implementation uses somewhat hacky way to expose remote config to
the loader. Webpack has better ways to do this (like creating dependencies on
the go and then resolving them in loader). Further development of this package
should be done that way.
