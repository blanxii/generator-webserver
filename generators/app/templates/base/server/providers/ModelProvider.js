import UserModel from '../models/UserModel';

export default function modelProvider(container) {
  <% if(['mysql', 'postgresql', 'sqlite'].includes(options.database)){ %>
  container.service('userModel', (c) => {
    return new UserModel({
      dbConnection: c.get('sqlConnection')
    });
  });
  <% } %>

  <% if(options.database == 'mongodb'){ %>
  container.service('userModel', () => {
    return UserModel;
  });
  <% } %>
}
