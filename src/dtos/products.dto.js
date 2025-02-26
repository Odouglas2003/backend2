import Joi from "joi"

export const productDTO = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required()
})