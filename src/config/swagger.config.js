import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentacion de Users',
      version: '1.0.0',
      description: 'Esta es la documentacion para el modulo de usuarios del proyecto',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/router/user.router.js'], // Ruta del archivo donde documentaremos las rutas
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default swaggerDocs
