import Joi from "joi"

export const orderDTO = Joi.object({
    user: Joi.string().hex(24).required(),
    products: Joi.array().string().hex(24).required(),
    total: Joi.number().required()
})
