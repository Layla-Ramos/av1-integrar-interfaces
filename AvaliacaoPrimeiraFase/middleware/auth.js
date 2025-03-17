require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

//aqui ocorre a verificação do token 
const WithAuth = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 
    
    if (!token) return res.status(401).json
    ({ error: 'Entrada não autorizada, apenas administradores podem acessar essa rota' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado' });
        }
        req.email = decoded.email;
        next();
    });
};

module.exports = WithAuth;