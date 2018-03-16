<% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
import Sequelize from 'sequelize';

module.exports = class UserModel {
  constructor({ dbConnection }) {
    this.dbConnection = dbConnection;
    return this.init();
  }

  init() {
    const userSchema = this.dbConnection.define('tbl_user', {
      id: {
        type: Sequelize.INTEGER,
        field: 'i_id',
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        field: 's_email',
      },
    });
    userSchema.sync({ force: false });
    return userSchema;
  }
};
<% } %><% if(options.database == 'mongodb'){ %>
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

module.exports =  Promise.promisifyAll(mongoose.model('User', userSchema));
<% } %>
