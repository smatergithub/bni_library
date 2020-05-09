// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API E-LIBRARY',
      version: '1.0.0',
      description: 'A test project to understand how easy it is to document and Express API',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:2000/swagger',
      },
    ],
  },
  apis: ['../models/index.js', '../routes/index.js'],
  basePath: '/',
};

module.exports = {
  options,
};
