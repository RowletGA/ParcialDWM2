import request from 'supertest';
import index from '../index.mjs';
import { getJugadores } from '../src/controllers/jugadoresController.mjs';

describe( 'GET /players', () => {
    it('should return 200 OK', async () => {
        const res = await request(index).get('/players');
        expect(res.status).toBe(200);
    });
    it('should return a list of players', async () => {
        const res = await request(index).get('/players');
        expect(res.body).toBeDefined();
    });
    it('should return a list of players', async () => {
        const res = await request(index).get('/players');
        expect(res.body).toEqual(getJugadores());
    });
});
