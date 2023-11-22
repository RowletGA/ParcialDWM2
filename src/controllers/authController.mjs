import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

const JWT_SECRET = process.env.JWT_SECRET;
let users = [];

function createToken(user) {
    if (!JWT_SECRET) {
        throw new Error('La clave JWT_SECRET no está definida');
    }
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
}
function validarEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // regex con el fin de validar tanto mail como contra, ambos son basicos ej contra de 8 car conteniendo num y min y mayus.
    return regexEmail.test(email);
}
function validarPassword(password) {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regexPassword.test(password);
}

export async function signup(req, res) {
    const { nombre, email, password } = req.body;

    if (!validarEmail(email)) {
        return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
    }

    if (!validarPassword(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, incluyendo números, mayúsculas y minúsculas' });
    }

    const usuarioExistente = users.find((user) => user.email === email);

    if (usuarioExistente) {
        return res.status(401).json({ message: 'El usuario ya existe' });
    }
    const hashedPassword = await User.hashPassword(password);
    const newUser = new User(nombre, email, hashedPassword);
    users.push(newUser);
    res.status(201).json({ message: 'Usuario creado con éxito' });
}

export async function login(req, res) {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario || !(await usuario.compararPassword(password))) {
        return res.status(401).send('Credenciales incorrectas.');
    }

    const token = createToken(usuario);
    res.json({ token });
}
