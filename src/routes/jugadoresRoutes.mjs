import express from 'express';
import {getJugadores , getJugador, getConvocados, altaJugador, bajaJugador, modificarJugador, convocarJugador } from '../controllers/jugadoresController.js';

const router = express.Router();
router.get('/players', getJugadores);
router.get('/players/:id', getJugador);
router.get('/call', getConvocados);
router.post('/call/:id', altaJugador);
router.delete('/players/:id', bajaJugador);
router.put('players/:id', modificarJugador);
router.post('/convocar/:id', convocarJugador);


