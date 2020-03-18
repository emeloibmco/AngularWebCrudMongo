'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// user set constiables
// user set constiables
const mongoURL = process.env.MONGO_URL || '172.30.61.109';
const mongoUser = process.env.MONGO_USER || 'efectyws';
const mongoPass = process.env.MONGO_PASS || 'Passw0rd';
const mongoDBName = process.env.MONGO_DB_NAME || 'sampledb';

module.exports = function(app){

	// set up other middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 1,
		reconnectTries: 1
	};

	// connect to the MongoDB
	let mongoConnect = 'mongodb://127.0.0.1:27017';
	if (mongoURL !== '' && mongoUser !== '' && mongoPass != '') {
  		mongoConnect = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}:27017/${mongoDBName}`;
	} else if (mongoURL !== '') {
  		mongoConnect = `mongodb://${mongoURL}/${mongoDBName}`;
	}

	mongoose.Promise = global.Promise;
	mongoose.connect(mongoConnect, options)
  		.catch((err) => {
    		if (err) console.error(err);
  	});

	var db = mongoose.connection;
	db.on('error', (error) => {
        console.error(error);
	});

	var sess = {
	  store: new MongoStore({ mongooseConnection: mongoose.connection }),
	  name: 'mean example',
	  secret: 'ninpocho',
	  resave: false,
	  saveUninitialized: true,
	  cookie: {}
	};

	app.use(session(sess));

	console.info('Connection established with mongodb');
	console.info(`Connection details: ${mongoConnect}`);
};

