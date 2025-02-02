import { Router } from "express"
import {productManager} from'../mannagers/productsMannager.js'
import { productModel } from "../dao/models/products.model.js"
import { productDao } from "../dao/mongoDao/poducts.dao.js"

const router = Router()

router.get("/", async (req,res)=>{
    const {limit, page, sort, category, status} = req.query
    try {

        const option = {
            limit: limit || 10,
            page: page || 1,
            sort: {price: sort === "asc" ? 1 : -1},
            category: category || null,
            lean: true,
        }

        if(status){
            const products = await productDao.getAll({status: status}, {option}) 
            return res.json({status: "succes" , playload: products})
        }

        if(category){
            const products = await productDao.getAll({category: category}, {option}) 
            return res.json({status: "succes" , playload: products})
        }

        const products = await productDao.getAll({}, {option})
        res.json({status: "succes" , playload: products})
        
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
    
})

//buscar por id
router.get("/:pid", async (req,res)=>{
    const {pid} = req.params
    try {

        const product = await productDao.getById(pid)
        console.log(product)
        
        res.send(product)

    }catch (err){
        console.log(err)
        res.send(err.message)
    }
})

//cargar nuevo producto
router.post("/", async (req,res)=>{
    const body = req.body
    try {
        const product = await productDao.create(body)
        
        res.json({ playload: product})

    }catch (err){
        console.log(err)
        res.send(err.message)
    }
})


router.put("/:pid", async (req,res)=>{ 
    const {pid} = req.params
    const body = req.body
    try {

        const findProduct = await productDao.getById(pid)
        if(!findProduct) return res.json({status:"error", message:`product id ${pid} no encontrado`})

        const product = await productDao.update(pid, body)
        
        res.json({status: "succes" , playload: "products"})

    }catch (err){
        console.log(err)
        res.send(err.message)
    }
})

router.delete("/:pid", async (req,res)=>{
    const {pid} = req.params
    
    try {
        const findProduct = await productDao.delete(pid)
        if(!findProduct) return res.json({status:"error", message:`product id ${pid} no encontrado`})

        const product = await productDao.delete(pid)
        
       res.json({status: "succes" , playload: `product id ${pid} eliminado`})

    }catch (err){
        console.log(err)
        res.send(err.message)
    }
})



export default router