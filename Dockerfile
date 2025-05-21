
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]


#stefania23/ecommerce-backend:latest
