
import { verifyToken } from '../helpers'


export const isAdmin = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const tokensData = verifyToken(req.headers.authorization.split(" ")[1], process.env.JWT_ADMIN_SECRET)
            if (tokensData && tokensData.role === 'admin') {
                next()
            } else {
                res.status(403).json({
                    message: 'You Are Not A admin'
                })
            }
        } else {
            next(new Error('No token provided'))
        }
    } catch (error) {
        next(error)
    }
}

export const isManager = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const tokensData = verifyToken(req.headers.authorization.split(" ")[1], process.env.JWT_MANAGER_SECRET)
            if (tokensData && tokensData.role === 'manager') {
                next()
            } else {
                res.status(403).json({
                    message: 'You Are Not A Manager '
                })
            }
        } else {
            next(new Error('No token provided'))
        }
    } catch (error) {
        next(error)
    }
}

export const isDeliveryManager = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const tokensData = verifyToken(req.headers.authorization.split(" ")[1], process.env.JWT_DELIVERYMANAGER_SECRET)
            if (tokensData && tokensData.role === 'deliveryManager') {
                next()
            } else {
                res.status(403).json({
                    message: 'You Are Not A responsible'
                })
            }
        } else {
            next(new Error('No token provided'))
        }
    } catch (error) {
        next(error)
    }
}

export const isDriver = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const tokensData = verifyToken(req.headers.authorization.split(" ")[1], process.env.JWT_DRIVER_SECRET)
            if (tokensData && tokensData.role === 'driver') {
                next()
            } else {
                res.status(403).json({
                    message: 'You Are Not A Driver'
                })
            }
        } else {
            next(new Error('No token provided'))
        }
    } catch (error) {
        next(error)
    }
}







