const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const GitHubStrategy = require('passport-github2').Strategy;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const port = process.env.PORT || 3000;

app
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use(bodyParser.json())
	.use(
		session({
			secret: 'secret',
			resave: false,
			saveUninitialized: true,
		})
	)
	//This is the basic express session({..}) initialization.
	.use(passport.initialize())
	// init passport on every route call
	.use(passport.session())
	//allow passport to use express-session
	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Header',
			'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
		);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'POST, GET, PUT, PATCH, OPTIONS, DELETE'
		);
		next();
	})
	.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
	.use(cors({ origin: '*' }))
	.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () =>
			console.log(`Connected to DB and listening on ${port}`)
		);
	}
});
