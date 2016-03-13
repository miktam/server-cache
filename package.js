Package.describe({
  summary: 'Server-side cache useful for REST API',
  version: '1.0.0',
  name: 'miktam:server-cache',
  git: 'https://github.com/miktam/server-cache'
});

Package.on_use(function (api, where) {

  if(api.versionsFrom) {
    api.versionsFrom('METEOR@0.9.0');
  }

  api.add_files(['server_cache.js'], 'server');
  api.export('ApiCache', 'server');
});



