import fs from 'fs'

export class CartManager {
    constructor() {
        this.filePath = './src/mannagers/carts.json' //ruta al archivo donde se cargan las cart
        this.carts = this.loadCarts()
    }

    //lee el json y si hay un error lo muestra
    loadCarts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8')
            return JSON.parse(data)
        } catch (err) {
            return []
        }
    }

    //guarda las carts en el archivo json
    saveCarts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2))
    }

    //genera id unico por cada cart
    generateUniqueId() {
        return this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1
    }

    //añade las cart al carrito y actualiza el json
    addCart(cart) {
        this.carts.push(cart)
        this.saveCarts()
    }
}
