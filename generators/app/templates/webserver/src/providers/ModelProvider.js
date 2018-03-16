import container from 'simple-di';
import UserModel from '../models/UserModel';
<% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
container.register('userModel', () => (
  new UserModel({ dbConnection: container.get('SQLConnection') })
));
<% } %><% if(options.database == 'mongodb'){ %>
container.get('MongoConnection');

container.register('userModel', () => {
  return UserModel;
});
<% } %>
