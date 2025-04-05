//import { fakerTH } from "@faker-js/faker"
import winston from "winston"

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue'
    }   
}

//1
export const logger = winston.createLogger({
    levels: customLevels.levels,
    
    transports: [
        new winston.transports.Console({level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevels.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log', 
            level: 'warn', 
            format: winston.format.simple()
        })//guarda los errores en un archivo
    ]
})
//que hace: crea un logger con niveles personal

//2
export const log = (req, res, next) =>{
    req.logger = logger
    logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`) 
    //muestra por consola el metodo y la url
    
    next()
}


//que hace logger: muestra por consola los mensajes de nivel que le indiquemos hacia arriba

//1 - le digo que muestre por consola los mensajes de nivel info hacia arriba
//2 - le digo que muestre por consola el metodo y la url

//en el app.js
//app.use(log) //middleware de logueo para cada peticion que se haga en el servidor

