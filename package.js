Package.describe({
  summary: 'Server-side cache useful for REST API',
  version: '0.2.0',
  name: 'miktam:server-cache',
  git: 'https://github.com/avrora/server-cache'
});

Package.on_use(function (api, where) {

  if(api.versionsFrom) {
    api.versionsFrom('METEOR@0.9.0');
  }

  api.add_files(['server_cache.js'], 'server');
  api.export('ApiCache', 'server');
});



