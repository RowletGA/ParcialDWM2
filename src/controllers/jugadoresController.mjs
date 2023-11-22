import Jugadores from "../models/jugadores.mjs";
/*Debido a los buenos resultados de las últimas fechas, la Asociación Uruguaya de Fútbol desea realizar una aplicación que permita catalogar a todos los futbolistas seleccionables por el actual DT, Marcelo Bielsa.

La aplicación permite agregar, eliminar listar y modificar jugadores.

Se pide realizar una API en Node utilizando Express que permitirá realizar las siguientes acciones: 

Sign-up & Login
Autenticación de todos los demás recursos utilizando JWT
Listado de Jugadores
Alta y Baja de Jugadores
Se debe contemplar la entidad Jugador, que constará de las siguientes propiedades:
Id: string (se sugiere número representado como string)
Nombre: string
Posición: string (sólo se acepta GK, DF,MD,FW)
Suspendido: boolean
Lesionado: boolean
NO SE DEBE PERSISTIR EN BASE DE DATOS

INFORMACIÓN ADICIONAL
Se cuenta con una colección de Postman que puede ser utilizada para probar los endpoints creados antes de entregar. Asimismo, se cuenta con un db.json con varios jugadores pre-cargados que puede ser utilizado en caso de no querer mantener los datos en memoria.

OPCIONALES
Modificaciónde jugadores (la modificación sólo permite editar las propiedades de posición, suspendido, lesionado)
Listado de Jugadores convocados
Convocar Jugadores
El listado de jugadores convocados debe ser de 22 jugadores, en caso de no llegar, se retorna un error
Solo se podrán convocar jugadores que tengan las propiedades suspendido y lesionado con valor en false
Se debe validar que haya al menos un jugador por posición en la convocatoria*/ 
let jugadores = [];
let jugadoresConvocados = [];

export function getJugadores(req, res) {
    if (jugadores.length === 0) {
        return res.status(404).json({ message: 'No hay jugadores cargados' });
    }
    res.json(jugadores);
}
export function getJugador(req, res) {
    const { id } = req.params;
    const jugador = jugadores.find((j) => j.id === id);
    if (!jugador) {
        return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(jugador);
}
export function altaJugador(req, res) {
    const { id, nombre, posicion, suspendido, lesionado } = req.body;
    const jugadorExistente = jugadores.find((j) => j.id === id);
    if (jugadorExistente) {
        return res.status(400).json({ message: 'El jugador ya existe en el plantel de bielsa' });
    }
    const nuevoJugador = new Jugadores(id, nombre, posicion, suspendido, lesionado);
    jugadores.push(nuevoJugador);
    res.status(201).json({ message: 'Jugador dado de alta' });
}
export function bajaJugador(req, res) {
    const { id } = req.params;
    const jugador = jugadores.find((j) => j.id === id);
    if (!jugador) {
        return res.status(404).json({ message: 'El jugador no está en el plantel' });
    }
    jugadores = jugadores.filter((j) => j.id !== id);
    res.json({ message: 'Jugador dado de baja' });
}
export function modificarJugador(req, res) {
    const { id } = req.params;
    const { posicion, suspendido, lesionado } = req.body;
    const jugador = jugadores.find((j) => j.id === id);
    if (!jugador) {
        return res.status(404).json({ message: 'El jugador no está en el plantel' });
    }
    if 
    (posicion !== 'GK' && posicion !== 'DF' && posicion !== 'MD' && posicion !== 'FW') {
        return res.status(400).json({ message: 'Posición inválida' });
    }
    jugador.posicion = posicion;
    if (suspendido !== undefined) {
        jugador.suspendido = suspendido;
    }
    if (lesionado !== undefined) {
        jugador.lesionado = lesionado;
    }
    res.json({ message: 'Jugador modificado' });
}
// no me queda claro si para algunas opciones habria que crear otro controller tipo DT para que las maneje unicamente bielsa en este caso, ya que tiene los privilegios de dt, o si cualquuier usuario lo puede hacer, en otro caso habria que crear un nuevo controller para el dt y que este herede de authcontroller o similar para que pueda dar uso de las funciones
export function getConvocados(req, res) {
    const arqueros = jugadores.filter((j) => j.posicion === 'GK'); 
    const defensas = jugadores.filter((j) => j.posicion === 'DF'); 
    const mediocampistas = jugadores.filter((j) => j.posicion === 'MD');
    const delanteros = jugadores.filter((j) => j.posicion === 'FW');
    if (arqueros.length < 1 || defensas.length < 1 || mediocampistas.length < 1 || delanteros.length < 1) {
        return res.status(400).json({ message: 'No hay suficientes jugadores convocados' });
    }
    const convocados = jugadores.filter((j) => !j.suspendido && !j.lesionado); //filtra por jugadores que no esten ni suspendidos ni lesionados
    if (convocados.length < 22) {
        return res.status(400).json({ message: 'No hay suficientes jugadores convocados' });
    }
    res.json(convocados);
}
export function convocarJugador(req, res) {
    const { id } = req.params;
    const jugador = jugadores.find((j) => j.id === id);
    if (!jugador) { 
        return res.status(404).json({ message: 'El jugador no está en el plantel' });
    }
    if (jugador.suspendido || jugador.lesionado) { // si el jugador esta suspendido o lesionado no puede ser convocado de otra manera bielsa lo convoca el año que viene je
        return res.status(400).json({ message: 'El jugador no puede ser convocado' });
    }
    res.json({ message: 'Jugador convocado' });
}