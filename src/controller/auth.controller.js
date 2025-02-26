import { generateToken } from "../utils/jwt.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

const sendWelcomeEmail = (userEmail) => {
    const mailOptions = {
        from: process.env.MAILER_USER,
        to: userEmail,
        subject: 'Welcome!',
        text: 'Welcome to our platform!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export class AuthController {
    static async login(req, res) {
        console.log(req.user);

        const payload = {
            email: req.user.email,
            role: req.user.role
        };

        const token = generateToken(payload);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 // 1 hora
        });

        res.json({ message: "Login exitoso" });
    }

    static async register(req, res) {
        sendWelcomeEmail(req.user.email);
        res.json(req.user);
    }

    static async current(req, res) {
        res.json(req.user);
    }
}
