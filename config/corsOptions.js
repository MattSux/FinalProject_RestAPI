const allowedOrigins = require('./allowedOrigins'); //basically just a whitelist

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) // will want to remove !origin after development
        {
            callback(null, true)
        }
        else 
        {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;