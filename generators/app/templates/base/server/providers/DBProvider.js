import container from 'simple-di';
<% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
import Sequelize from 'sequelize';

container.register('SQLConnection', () => {
  return new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
		host: process.env.SQL_HOST,
		dialect: 'mysql',
		pool: {
			max: 1,
			min: 0,
			idle: 10000
		},
	});
});
<% } %>
<% if(options.database == 'mongodb'){ %>
import Promise from 'bluebird';
import mongoose from 'mongoose';

container.register('MongoConnection', () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/<%= name %>';
  mongoose.Promise = Promise;
  Promise.promisifyAll(mongoose);

  mongoose.connect(MONGO_URI, {
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      },
      auto_reconnect: true,
      reconnectTries: Number.MAX_VALUE
    },
    replset: {
      ha: true, // Make sure the high availability checks are on
      haInterval: 5000, // Run every 5 seconds
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    }
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + MONGO_URI);
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.error('Mongoose default connection disconnected');
  });
  return mongoose;
});
<% } %>
