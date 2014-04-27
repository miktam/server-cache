Package.describe({
  summary: 'Server-side cache useful for REST API'
});

Package.on_use(function (api, where) {
  api.add_files(['server_cache.js'], 'server')
  api.export('ApiCache', 'server');
});



