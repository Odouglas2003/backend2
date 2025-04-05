import express from 'express'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import User from '../dao/models/user.model.js' 
import  {productModel}  from '../dao/models/products.model.js' 

const router = express.Router()

//Generar usuario falso
const generateUser = () => {
    const password = bcrypt.hashSync('coder123', 10); //Contraseña encriptada

    const generateAge = () => Math.floor(Math.random() * (100 - 18 + 1)) + 18; //Edad entre 18 y 100 años

    const role = faker.helpers.arrayElement(['user', 'admin']); //Rol aleatorio
    return {
      first_name: faker.person.firstName(), 
      last_name: faker.person.lastName(),  
      email: faker.internet.email(),     
      age: generateAge(),      
      password,                          
      cart: null,                        
      role,                              
      products: [],                      
    };
  };

//Endpoint para generar 50 usuarios falsos
router.get('/mockingusers', (req, res) => {
  const users = Array(50).fill().map(generateUser)
  res.json(users) //devuelve los usuarios generados
});

//endpoint para generar datos en la base de datos
router.post('/generateData', async (req, res) => {
  const { users, products } = req.body; //Recibir parámetros de la petición

  try {
    const userGeneric = Array(users).fill().map(generateUser) //Generar usuarios

    const generateRandomStock = () => Math.floor(Math.random() * 100); // Genera un número entre 0 y 99

    const productGeneric = Array(products).fill().map(() => ({
      title: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),//Convertir a número
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      stock: generateRandomStock(),
      status: true,
    })) //Generar productos

    const savedUsers = await User.insertMany(userGeneric) //Insertar usuarios en la base
    const savedProducts = await productModel.insertMany(productGeneric) //productos en la base

    res.json({ message: 'Datos generados', users: savedUsers, products: savedProducts })
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar datos', details: error.message })
  }
})

export default router