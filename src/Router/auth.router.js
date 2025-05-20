import { Router } from 'express';
import passport from 'passport';
import { validateDto } from '../dao/middlewares/validateDto.middleware.js';
import userDto from '../dtos/user.dto.js';
import * as AuthController from '../controllers/auth.controller.js';

const router = Router();


// Rutas de autenticación
app.post('/register', validateDto(userDto), (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).json({ message: info.message })
        }
        req.user = user
        AuthController.register(req, res)
    })(req, res, next)
})

app.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).json({ message: info.message })
        }
        req.user = user
        AuthController.login(req, res);
    })(req, res, next)
});

app.get('/api/sessions/current', passport.authenticate('current', { session: false }), (req, res) => {
    AuthController.current(req, res)
})
