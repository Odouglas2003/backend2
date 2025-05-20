import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function createHash(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS); // Generar la sal de forma asíncrona
    const hashPassword = await bcrypt.hash(password, salt); // Generar el hash de forma asíncrona
    return hashPassword; // Retornar el hash de la contraseña
}

export async function verifyPassword(password, hash) {
    const isPasswordCorrect = await bcrypt.compare(password, hash);
    return isPasswordCorrect;
}
