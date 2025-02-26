import mongoose from "mongoose"

export const connectMongoDB = async  () => {
    
    mongoose.connect("mongodb+srv://Rubik:rubikoctasol@octavioeze21.yzh5b.mongodb.net/Servidor")

    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err)); 
    
}




//PAGINACION CON MOONGOSE - usamos cuando tenemos mucha info que enviar al cliente
// export const getPaginado = async (collection, limite = 5, skip = 0
//     , filtro = {}) => {
//         const query = collection.find(filtro).skip(skip).limit(limite);
//         const total = await collection.countDocuments(filtro);
//         const data = await query.toArray();
//         return { total, data };
// }

//para que se usa la paginacion?
//1. cuando tenemos mucha info que enviar al cliente
//4. cuando queremos mostrar la info de manera paginada y dinamica

//paginacion con mongoose paginate v2
// export const getPaginado = async (collection, limit = 5, skip = 0
//     , filtro = {}) => {
//         const query = collection.paginate(filtro, { limit, skip });
//         return query;
// }
