import dotenv from 'dotenv'
import path from 'path'

// Carga variables de entorno desde el.env 
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// Validar variables 
const requiredVars = ['MONGO_URI', 'JWT_SECRET', 'PORT']
requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Requiere las var de entorno: ${varName}`)
    process.exit(1)
  }
})

// Exportar las variables
export const env = {
  //MONGO_URI: process.env.MONGO_DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: Number(process.env.PORT),
}