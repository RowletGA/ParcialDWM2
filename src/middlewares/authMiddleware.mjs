import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    let token = req.headers['authorization']; 

    if (!token) {
        return res.status(403).send({ message: 'No se proporcionó token de autenticación.' });
    }

    if (token.startsWith('Bearer ')) { //saca el Bearer del token en caso de comenzar con el
        token = token.slice(7, token.length); 
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // En este caso, no me da el tiempo y desconozco los codigos exactos pero se puede especiificar el error en caso de que el token no sea valido o haya expirado mediante manejo de errores
        if (err) {
            return res.status(401).send({ message: 'No autorizado.' });
        }
        req.usuario = decoded; 
        next(); 
    });
};

export default verificarToken;