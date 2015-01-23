Package.describe({
  name: '3stack:accounts-organisation',
  version: '0.1.1',
  summary: 'Adds the concept of organisations to meteor user accounts (at the data level).',
  git: 'https://github.com/3stack-software/meteor-accounts-organisation',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.export('Organisations');

  api.versionsFrom('METEOR@0.9.2');
  api.use('3stack:embox-value@0.1.0', 'client');

  api.use('underscore', 'client');
  api.use('reactive-var', 'client');
  api.use('accounts-base', ['client', 'server']);
  api.use('logging', ['client', 'server']);

  api.addFiles('organisations-common.js');
  api.addFiles('organisations-client.js', 'client');
  api.addFiles('meteor-user-index-organisation-id.js', 'server');
});
