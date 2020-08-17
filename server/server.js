// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
// Remote hooks, that execute before or after calling a remote method,
// either a custom remote method  or a standard create, retrieve, update,
//  and delete method inherited from PersistedModel.
// See PersistedModel REST API for information on how the
// Node methods correspond to REST operations.
// Operation hooks are executed when a model performs CRUD operations.
// Connector hooks are executed before sending requests to a data source connector or after
// receiving a response from the connector.
app.models.user.find((err, result) => {
  if (result.length === 0) {
    const user = {
      email: 'gibbs@gibbs.com',
      password: 'test',
      username: 'rokuirie',
    };
    app.models.user.create(user, (err, result) => {
      console.log('Tried to create user', err, result);
    });
  }
});

app.models.user.afterRemote('create', (context, user, next) => {
  console.log(context);
  app.models.Profile.create({
    firstName: user.username,
    createdAt: new Date(),
    userID: user.id,
  });
  next();
},
(err, result) => {
  if (!err && result) {
    console.log('Created new profile!', result);
  } else {
    console.log('This is an error message informing you of an error.',
                'You do not need to do anything',
                'Everything is okay.',
                err);
  }
});
