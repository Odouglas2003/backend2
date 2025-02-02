import { Router } from 'express'
import { cartDao } from '../dao/mongoDao/cart.dao.js'
import { productDao } from '../dao/mongoDao/poducts.dao.js'

const router = Router()

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const cart = await cartDao.create({ products: [] })
        res.json({ status: "success", payload: cart })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

// Agregar producto a carrito
router.post('/:idCart/products', async (req, res) => {
    try {
        const idCart = req.params.idCart
        const { idProduct, quantity } = req.body

        const cart = await cartDao.getById(idCart)
        if (!cart) return res.json({ status: "error", message: "Carrito no encontrado" })

        const product = await productDao.getById(idProduct)
        if (!product) return res.json({ status: "error", message: "Producto no encontrado" })

        cart.products.push({ product: idProduct, quantity: quantity })
        await cart.save()

        res.json({ status: "success", payload: cart })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

// Obtener todos los productos del carrito con "populate"
router.get('/:cid', async (req, res) => {
    const { cid } = req.params

    try {
        const cart = await cartDao.getById(cid);
        if (!cart) return res.json({ status: "error", message: "Carrito no encontrado" })

        res.json({ status: "success", payload: cart })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})


// Eliminar producto de carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params

    try {
        const product = await productDao.getById(pid)
        if (!product) return res.json({ status: "error", message: "Producto no encontrado" })

        const cart = await cartDao.getById(cid)
        if (!cart) return res.json({ status: "error", message: "Carrito no encontrado" })

        cart.products = cart.products.filter(p => p.product.toString() !== pid)
        await cart.save()

        res.json({ status: "success", payload: cart })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

// Actualizar carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { products } = req.body

    try {
        const cart = await cartDao.update(cid, { products })
        res.json({ status: "success", payload: cart })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartDao.getById(cid)
        if (!cart) return res.json({ status: "error", message: "Carrito no encontrado" })

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid)
        if (productIndex === -1) return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" })

        cart.products[productIndex].quantity = quantity
        await cart.save()

        res.json({ status: "success", payload: cart })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

// Obtener todos los carritos 
router.get('/', async (req, res) => { 

    try { const carts = await cartDao.getAll();
        res.json({ status: "success", payload: carts })
    } 
    catch (err) { 
        console.log(err)
        res.status(500).send(err.message)
    }

})

// Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params

    try {
        const cart = await cartDao.getById(cid)
        if (!cart) return res.json({ status: "error", message: "Carrito no encontrado" })

        cart.products = []
        await cart.save()

        res.json({ status: "success", payload: cart })
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
})


export default router
