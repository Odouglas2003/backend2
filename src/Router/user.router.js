import { Router } from "express"
import { checkId } from "../dao/middlewares/checkId.middleware.js"
import { UserController } from "../controller/user.controller.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: endpoints de usuarios
 */

/**
 * * @swagger
 * * /api/users:
 * *   get:
 * *     summary: Obtener todos los usuarios
 * *     tags: [Users]
 * *     responses:
 * *       200:
 * *         description: Lista de usuarios
 * *       500:
 * *         description: Error interno del servidor
 * *   post:
 * *     summary: Crear un nuevo usuario
 * *     tags: [Users]
 * *     responses:
 * *       200:
 * *         description: Usuario creado
 * *       500:
 * *         description: Error interno del servidor
 */


router.get('/users', UserController.getUsers)

router.use((req, res, next) => {
    console.log("se ejecuta endpoint de user")
    next()
})


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

router.get("/:id", checkId, (req, res) => {
    res.json({ message: "endpoint de user" })
})

let users = []

router.get("/", (req, res) => {
    res.status(200).send(users)
})

router.get("/:id", checkId, (req, res) => {
    const { id } = req.params
    const user = users.find(user => user.id === Number(id))
    if (!user) return res.status(404).send("usuario no encontrado")

    res.status(200).send(user)
})


/**
 * @swagger
 * /users:
 *   post:
 *     summary: crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: usuario creado
 *         
 */

router.post("/", checkId, (req, res) => {
    const user = req.body;
    const newUser = {
        id: users.length + 1,
        ...user
    }

    users.push(newUser)

    res.status(201).send(users) // 201 porque se creó algo.
})


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: usuario actualizado
 *       404:
 *         description: Uusuario no encontrado
 */


router.put("/:id", (req, res) => {
    const { id } = req.params
    const data = req.body
    
    const userIndex = users.findIndex(user => user.id === Number(id));
    if (userIndex === -1) return res.status(404).send("usuario no encontrado")
    
    users[userIndex] = {
        ...users[userIndex],
        ...data
    }

    res.status(200).send(users[userIndex])
})


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Uusuario eliminado
 *       404:
 */

router.delete("/:id", (req, res) => {
    const { id } = req.params

    const user = users.find(user => user.id === Number(id))
    if (!user) return res.status(404).send("usuario no encontrado")
    
    users = users.filter(user => user.id !== Number(id))
    
    res.status(200).send("user deleted")
})


export default router
