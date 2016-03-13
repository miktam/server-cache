# Server-side cache for REST API for Meteor

Server-side cache is useful in case of implementation of the REST API, when other party is not able to use DDP Client, and communication has to be done using HTTP(s).

Cache uses mongodb as key-value storage to store JSON/string, with expiration time set to 60s (configurable).

Collections for storing cached data is `cache_` + provided parameter during ApiCache instantiation (e.g. `cache_rest`)

## Installation

`meteor add miktam:server-cache`

## Usage

The module exposes `ApiCache` object, which shall be instantiated with the cache name and ttl.

In the example below, with simple endpoint implementation using [iron-router](https://atmospherejs.com/package/iron-router), `cache.set` and `cache.get` methods help to store and retrieve the cache data.

```js
    // instantiate the cache with name and 60s ttl (expiration time)
    var cache = new ApiCache('rest', 60);

    Router.map(function () {

    this.route("heavy-rest-endpoint",
      {
        path: "/heavy-endpoint",
        where: "server",
        action: function() {
          // key for cache - the url of this endpoint
          var keyForCache = this.request.url;
          var dataFromCache = cache.get(keyForCache);
          if (dataFromCache) {
            // data is cached, do not bother with calculation, just send it back
            this.response.end(JSON.stringify(dataFromCache));
          } else {
            // retrieve the data from anywhere as data is not cached
            var dataHardToGet = { heavy_calculation: true };
            // store data in the cache using url as a key
            cache.set(keyForCache, data);
            this.response.end(JSON.stringify(dataHardToGet));
          }
        }
      });
    }
```

## Licence

The MIT License (MIT)

Copyright (c) 2014, Andrei Karpushonak aka @miktam