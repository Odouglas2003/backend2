import dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcrypt'
import User from '../dao/models/user.model.js'
import { createHash, verifyPassword } from '../utils/hash.js'

const JWT_SECRET = process.env.JWT_SECRET;

function initializePassport() {
    passport.use(
        'register',
        new LocalStrategy(
            {
                usernameField: 'email',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                const { firstName, lastName, age } = req.body

                if (!email || !password || !firstName || !lastName) {
                    return done(null, false, { message: 'All fields are required' })
                }

                const hashedPassword = createHash(password)

                try {
                    const user = await User.create({
                        email,
                        password: hashedPassword,
                        first_name: firstName,
                        last_name: lastName,
                        age,
                    })

                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({email})

                    if (!user) return done(null, false, {message: 'User not found'})

                    const isValidPassword = await verifyPassword(password, user.password)

                    if (!isValidPassword) return done(null, false, {message: 'Invalid password'});

                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'current',
        new JWTStrategy(
            {
                secretOrKey: JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            },
            async (payload, done) => {
                try {
                    const user = await User.findById(payload.id)
                    if (!user) return done(null, false)
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) =>{
        try {
            const user = await User.findById(id)
            return done(null, user)
        } catch (error){
            return done(`Hubo un error: ${error.message}`)
        }
    })
}

function cookieExtractor(req){
    let token = null

    if (req && req.cookies) {
        token = req.cookies.token
    }
    return token
}

export { initializePassport, createHash, verifyPassword }
