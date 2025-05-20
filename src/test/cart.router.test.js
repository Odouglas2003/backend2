import mongoose from 'mongoose'
import app from '../app.js'  //instancia de app de Express
import request from 'supertest'
import { expect } from 'chai'
import {productModel} from '../dao/models/products.model.js' 

// Conectar a la base de datos
mongoose.connect("mongodb+srv://Rubik:rubikoctasol@octavioeze21.yzh5b.mongodb.net/Servidor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

describe('Cart Router Tests', function () {
  let cartId
  let productId

  // Crear un producto de prueba antes de ejecutar las pruebas
  before(async function () {
    const product = new productModel({
        title: "product test",
        description: "test",
        price: 100,
        thumbnail: "product test",
        code: 123,
        stock: 5,
        category: "test",
    })

    const savedProduct = await product.save()
    productId = savedProduct._id;  // Guarda el ObjectId del producto guardado
  })

  // Test para crear un carrito
  it('debe crear un nuevo carrito', async function () {
    const response = await request(app).post('/api/carts')
    expect(response.status).to.equal(200)
    expect(response.body.payload._id).to.exist
    cartId = response.body.payload._id
  })

  // Test para agregar un producto al carrito
  it('debería agregar un producto al carrito', async function () {
    const response = await request(app)
      .post(`/api/carts/${cartId}/products`)
      .send({ idProduct: productId, quantity: 1 }) //usa el id de mongo 

    expect(response.status).to.equal(200)
    expect(response.body.payload.products.length).to.equal(1)
  })

  // Test para obtener los productos en el carrito
  it('debe traer los productos en el carrito', async function () {
    const response = await request(app).get(`/api/carts/${cartId}`)
    expect(response.status).to.equal(200)
    expect(response.body.payload.products.length).to.equal(1)
  })


  // Test para eliminar un producto del carrito
it('debe eliminar un producto del carrito', async function () {
  const response = await request(app).delete(`/api/carts/${cartId}/products/${productId.toString()}`)
  
  expect(response.status).to.equal(200)
  expect(response.body).to.have.property('payload')
  
  //que el arreglo de productos esté vacío después de eliminar
  expect(response.body.payload.products).to.be.an('array').that.is.empty
})


  // Test para actualizar el carrito con nuevos productos
  it('debe actualizar el carrito con los productos', async function () {
    const response = await request(app)
      .put(`/api/carts/${cartId}`)
      .send({ products: [{ product: productId, quantity: 2 }] })  

    expect(response.status).to.equal(200)
    expect(response.body.payload.products.length).to.equal(1)
    expect(response.body.payload.products[0].product.toString()).to.equal(productId.toString())
  })
})
