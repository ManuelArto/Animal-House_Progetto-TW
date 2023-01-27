const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'AnimalHouse Server',
    version: process.env.VERSION,
    description: 'Random description on API related stuff',
  },
  servers: [
    {
      url: '',
      description: 'Host system path',
    },
  ],
  definitions: {},
  paths: {},
};

// options for the swagger docs
export const options = (fileName: string) => ({
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [fileName],
});
