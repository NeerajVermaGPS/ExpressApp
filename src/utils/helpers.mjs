import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    return bcrypt.hashSync(password, salt)
}

export const comparePassword = (plain, hashed) => {
    return bcrypt.compareSync(plain, hashed)
}