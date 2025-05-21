import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import dotenv from 'dotenv'

import userRoutes from './Router/user.router.js'
import productsRoutes from './router/products.router.js'
import cartRoutes from './router/cart.router.js'
import userDto from './dtos/user.dto.js'
import mocksRouter from './router/mock.router.js'
import swaggerDocs from './config/swagger.config.js'

import { connectMongoDB } from "./config/mongoDB.config.js"
import { initializePassport } from './config/passport.config.js'
import { log, logger } from "./config/logger.js"


// Cargar variables de entorno
dotenv.config()

connectMongoDB()

// Inicializar y ejecutar express
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())// Middleware para parsear cookies
app.use(log) // Middleware de logueo para cada petición que se haga en el servidor

initializePassport() // Inicializar Passport
app.use(passport.initialize())

app.use('/index', express.static("public")) // Utilizar archivos HTML, CSS y JS estáticos

// Rutas
app.use("/api/users", userRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/carts", cartRoutes)
app.use('/api/mocks', mocksRouter)

swaggerDocs(app) // Documentación de la API

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("error")
});

const PORT = process.env.PORT || 5000 // Puerto dinámico
// El puerto que usamos es para asegurarnos que no se esté usando
app.listen(PORT, () => {
    logger.info(`Servidor iniciado en el puerto ${PORT}`)
    logger.info("Ruta a nivel app ejecutándose")
})


export default app // Exportar la app para usarla en los tests