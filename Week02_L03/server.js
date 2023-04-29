const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const port = process.env.PORT || 3000;

app
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use(bodyParser.json())
	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		next();
	})
	.use('/', require('./routes/contacts'));

mongodb.initDb((err, mongodb) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () =>
			console.log(`Connected to DB and listening on ${port}`)
		);
	}
});
