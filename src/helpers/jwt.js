import jwt from 'jsonwebtoken';

export const generateToken = ({ id, email ,name}, secret, role) => {
    const token = jwt.sign({
        id,
        email,
        role,
        name
    }, secret, {
        expiresIn: '24h'
    })
    return token
}

export const verifyToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (error) {
        throw new Error("invalid token")
    }
}

export const isTokenValid = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (error) {
        return false
    }
}


export const randomToken = (token) => {
    return roles.map(role => isTokenValid(token, role) ? verifyToken(token, role) : null).filter(item => item !== null)[0]
}