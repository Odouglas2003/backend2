import Joi from "joi"


 const userDTO = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "user").default("user")

})

export default userDTO