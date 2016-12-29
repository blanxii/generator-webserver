import container from 'simple-di';

const UserModel = require('../models/UserModel');
<% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
container.register('userModel', () => {
  return new UserModel({ dbConnection: container.get('SQLConnection') });
});
<% } %>
<% if(options.database == 'mongodb'){ %>
container.get('MongoConnection');

container.register('userModel', () => {
  return UserModel;
});
<% } %>
