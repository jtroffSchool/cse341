const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'My API',
		description: 'Games API',
	},
	host: 'jtroffpersonalProject.onrender.com',
	schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
