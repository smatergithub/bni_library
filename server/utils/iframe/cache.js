
const { cacheConfig } = require('./config/cacheConfig')
const model = require('./config/model').model


let appCache = model;

function createCache() {
  if (!cacheConfig.disabled) {
    const Cache = require("node-cache");
    appCache = new Cache(appCache.options || cacheConfig)
  }
}

function configureCacheControl(options) {
  if ("disabled" in options) {
    if (options.disabled) {
      appCache = model;
    }
    const enableCache = cacheConfig.disabled && !options.disabled;
    cacheConfig.disabled = !!options.disabled;
    enableCache && createCache();
  }

  if (!cacheConfig.disabled) {
    appCache.options = Object.assign({}, appCache.options, options);
  }
}

createCache();

module.exports = { appCache, configureCacheControl };
