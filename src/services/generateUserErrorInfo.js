//valiodar datos de usuario y segun lo que suceda mostrara los errores

export const GenerateUserErrorInfo  = user =>{
    return `
    datos requeridos:
    *firstName: debe ser un string ${user.first_name}
    *lastName: debe ser un string ${user.last_name}
    *email: debe ser un string ${user.email}
    `
}