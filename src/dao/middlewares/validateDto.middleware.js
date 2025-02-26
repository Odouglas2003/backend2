
export function validateDto(dto) {
    return (req, res, next) => {
        console.log("Datos recibidos:", req.body)
        const { error } = dto.validate(req.body)
        if (error){
            return res.status(400).json({ message: error.message })

        }
        next()
    }
}
