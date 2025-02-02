//inicializar config del backend - comando: npm run dev para iniciar y guardar servidor
import express from "express";
import userRoutes from './router/user.router.js';
import productsRoutes from './router/products.router.js';
import cartRoutes from './router/cart.router.js';
import { connectMongoDB } from "./config/mongoDB.config.js";

connectMongoDB();

// Inicializar y ejecutar express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/index', express.static("public")); // Utilizar archivos HTML, CSS 

app.use((req, res, next) => {
    console.log("Ruta a nivel app ejecutándose");
    next(); // Una vez que se ejecuta, sale de la función y continúa con el resto de los endpoint
});

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);

app.get('/test', (req, res) => {
    res.send('¡La ruta de prueba está funcionando!');
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("error");
});

const PORT = 8080; // Puerto dinámico
// El puerto que usamos es para asegurarnos que no se esté usando
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});


