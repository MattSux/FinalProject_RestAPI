const allowedOrigins = [
    'https://www.yourdomain.com',
    'http://127.0.0.1:5500', 
    'http://localhost:3500'
]; // 'http://127.0.0.1:5500' is the same as http://localhost:5500 --> !!! Remove local host values after development.

module.exports = allowedOrigins;