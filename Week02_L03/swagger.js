const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'My API',
		description: 'Contacts API',
	},
	host: 'jtroffweek02l03.onrender.com',
	schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
