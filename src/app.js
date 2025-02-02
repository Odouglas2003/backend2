//inicializar config del backend - comando: npm run dev para iniciar y guardar servidor
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRoutes from './router/user.router.js'
import productsRoutes from './router/products.router.js'
import cartRoutes from './router/cart.router.js'
import { connectMongoDB } from "./config/mongoDB.config.js"
import { initializePassport } from './config/passport.config.js'
import passport from 'passport'
import { AuthController } from './controller/auth.controller.js'

connectMongoDB()

// Inicializar y ejecutar express
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()) // Middleware para parsear cookies

initializePassport() // Inicializar Passport
app.use(passport.initialize())

app.use('/index', express.static("public"))// Utilizar archivos HTML, CSS 

app.use((req, res, next) => {
    console.log("Ruta a nivel app ejecutándose")
    next() // Una vez que se ejecuta, sale de la función y continúa con el resto de los endpoint
})

app.use("/api/users", userRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/carts", cartRoutes)

app.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).json({ message: info.message })
        }
        req.user = user;
        AuthController.register(req, res)
    })(req, res, next)
})

app.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).json({ message: info.message })
        }
        req.user = user;
        AuthController.login(req, res)
    })(req, res, next)
})

app.get('/api/sessions/current', passport.authenticate('current', { session: false }), (req, res) => {
    AuthController.current(req, res)
})

app.get('/test', (req, res) => {
    res.send('LA PRUEBA FUNCIONA')
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("error")
})




const PORT = 5000 // Puerto dinámico
// El puerto que usamos es para asegurarnos que no se esté usando
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})