import fs from "fs";
import { v4 as uuid } from "uuid"

export class productManager{
    constructor(){
        this.products = [];
        this.path= "./src/mannagers/products.json" //guardar info en archivo
        
    }

    //leer el archivo
    //limit-limite de productos
    async getProducts(limit){
      
            const file = await fs.promises.readFile(this.path, "utf-8")
            const fileParse = JSON.parse(file)

            this.products = fileParse || []

            if(!limit)return this.products
            return this.products.slice(0, limit)
            
       
    }
     async addProduct(product){


            await this.getProducts()
            const {title, description, price, thumbnail, code, stock, category} = product

            const newProduct={
            id: uuid(), //id autoincremental
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status:true
            }
        //validar codigo de prod
            const productoExiste= this.products.find((product) => product.code === code)
                if(productoExiste) throw new Error(`ya existe un producto con el codigo: ${code}`)
            
        this.products.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        //sobreescribimos el archivo json para que se vallan agregando productos
            
       return newProduct
        
    }


    async getProductById(){

            await this.getProducts()
            const id = this.products.find((product) => product.id === id)
           if (!product) throw new Error("no existe el producto con el id")
            return product
    }

    async updateProduct(id, data){


            await this.getProductById(id)

            const index = this.products.findIndex((product=> product.id === id))
            this.products[index] = {...this.products[i]}//copiamos el objeto
            this.products[index] = {...this.products[i], ...data} //actualizamos el objeto

            await fs.promises.writeFile(this.path, JSON.stringify(this.products))

            return this.products[index]

    }

    async deleteProduct(id){
        
            await this.getProductById(id) //no llamamos a get porque en id ya se llama a esa func

            this.products = this.products.filter(products => products.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            return `Producto con id ${id} eliminado`
            
        
    }
}
