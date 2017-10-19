<% if(['mysql', 'postgresql', 'sqlite'].includes(options.database)) { %>
import Sequelize from 'sequelize';

export default class UserModel {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
    return this.init();
  }

  init() {
    const userSchema = this._dbConnection.define('tbl_user', {
      id: {
        type: Sequelize.INTEGER,
        field: 'i_id',
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        field: 's_email'
      }
    });
    userSchema.sync({ force: false });
    return userSchema;
  }
};
<% } %>

<% if(options.database == 'mongodb'){ %>
import Promise from 'bluebird';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true
  }
});

userSchema.index({ id: 1, email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
<% } %>
