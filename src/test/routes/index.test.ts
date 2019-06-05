import request from 'supertest';
import app from '../../app';

describe('GET /api', (): void => {
    it('Version API Request', async (): Promise<void> => {
        const result = await request(app).get('/api');
        expect(result.text).toEqual('API v1');
        expect(result.status).toEqual(200);
    });
});
