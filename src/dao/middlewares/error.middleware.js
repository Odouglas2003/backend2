import { logger } from '../config/logger.config.js';


export default function errorHandler(err, req, res, next) {
  // Loguea el stack del error
  logger.error(err.stack)
  // Envía respuesta genérica de error
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  })
}