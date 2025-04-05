export default class CustomError {
    static createError(name= 'Error', message, cause, code = 1) {
        const error = new Error(message)
        error.name = name
        error.code = code
        error.cause = cause
        throw error //cuando se llama a throw se deja de ejecutar el codigo     
    }
}

