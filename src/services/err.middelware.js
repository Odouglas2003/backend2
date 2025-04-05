import { Error } from '../services/enums.js'

export const handleError = (error, req, res, next) =>{
    console.error(error.cause)

    switch(error.code){
        case Error.INVALID_TYPES_ERROR:
            return res.send({status: 'error', error: err.message})
            break;
        
        case Error.DATABASE_ERROR:
            return res.status(500).send({status: 'error', err: 'Database error'})
            break;
        
        case Error.ROUTING_ERROR:
            return res.status(404).send({status: 'error', err: 'Routing error'})
            break;

        default:
            return res.send({status: 'error', err: 'Error en el servidor'})
            break;
    }
}

// que hace el switch en este caso
// es un switch que se encarga de manejar los errores