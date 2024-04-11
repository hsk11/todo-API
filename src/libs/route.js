const jaiSever = require('jai-server');
const jwt = require('jsonwebtoken');

function isValidUser(token) {
    try {
        const isVerified = jwt.verify(token, process.env.JWT_SECRET);
        return isVerified;
    }
    catch (e) {
    if (!(e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError')) {
        console.log(e);
    }
        return false;
    }
}


async function authValidator(req, res, next) {
    try {
        if ((req.path === '/users/login' || req.path === '/users/user')&& req.method=="POST") return next();
        console.log(req.path, req.method)
        let { authorization } = req.headers;

        if (!authorization) return res.status(401).send({ error: 'Unauthorized' });
        authorization = authorization.replace('Bearer ', '');
        const isVerified = isValidUser(authorization);

        if (!isVerified) return res.status(401).send({ error: 'Unauthorized' });
        req.user =  isVerified;
        next();
    }
    catch (e) {
        res.status(401).send({ error: 'Unauthorized' });
    }

}


const validatorMiddleware = (validator) => (req, res, next) => {
    if (validator) {
        const validateFor = Object.keys(validator);
        for (let index = 0; index < validateFor.length; index += 1) {
            const key = validateFor[index];
            const result = validator[key].validate(req[key] || {});

            if (result.error) {
                return res.status(400).send({ error: result.error.details });
            }

            req[key] = result.value;
        }
    }
    return next();
};

function addRoutes(routes, ...middlewares) {
    const router = jaiSever.Router();

    Object.keys(routes).forEach((route) => {
        const [method, ...path] = route.replace(/^([a-z]+)([A-Z])*/, '$1-$2').split('-');

        const url = path.join('').replace(/([a-z0-9]+)([A-Z]+)(\/.*)*/g, '$1-$2$3').toLocaleLowerCase();
        if (!router[method]) return console.log(`No method found for ${route}`);
        // if direct function, just add the route
        if (typeof routes[route] === 'function') return router[method](url, ...middlewares, routes[route]);

        const { handler, validator } = routes[route];
        if (!handler) return console.log(`No handler found for ${route}`);
        // if no validator, just add the route
        if (!validator) return router[method](url, handler);
        return router[method](url, ...middlewares, validatorMiddleware(validator), handler);
    });
    return router;
}
module.exports = { validatorMiddleware, addRoutes, authValidator };
