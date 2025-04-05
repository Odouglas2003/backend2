import { v4 as uuidv4 } from 'uuid'
import Ticket from '../dao/models/ticket.model.js'
import Cart from '../dao/models/cart.model.js'

export class OrderController {
    static async create(req, res) {
        try {
            const { 
                products: [{ id, quantity }],
                total: { total },
                user: { id: userId }
            } = req.body

    
            if (!userId) return res.status(400).json({ message: "El id de usuario es requerido" })

            const cart = await Cart.findById(id).populate('products.product')
            if (!cart) {
                console.log("Cart not found")
                return res.status(404).json({ message: 'Carrito no encontrado, lo sentimos!'})
            }

            let totalOrder = 0
            // Control de stock
            for (const item of cart.products) {
                const product = item.product
                

                if (!product) {
                    return res.status(400).json({ message: `Producto no encontrado en el carrito` })
                }

                if (product.stock < item.quantity) {
                    return res.status(400).json({ message: `No hay stock ${product.name}` })
                }
                totalOrder += product.price * item.quantity
                product.stock -= item.quantity
                await product.save()
            }

            if (totalOrder !== total) {
                return res.status(400).json({ message: "El total es incorrecto" })
            }

            // Crear el ticket
            const ticket = new Ticket({
                ticketId: uuidv4(),
                total: totalOrder,
                user: userId
            })

            await ticket.save()

            cart.products = []
            await cart.save()
            console.log("Cart Emptied:", cart)

            res.status(200).json({ message: "Orden completada", ticket })
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error })
        }
    }
}
