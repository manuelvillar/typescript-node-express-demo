import app from '../../app';
import request from 'supertest';

describe('GET /api/user/1', (): void => {
    it('respond with user 1 data', async (): Promise<void> => {
        const result = await request(app).get('/api/user/1');
        expect(result.body.first_name).toEqual('George');
        expect(result.status).toEqual(200);
    });
});

describe('GET /api/user/13', (): void => {
    it('respond  with a 404 error', async (): Promise<void> => {
        const result = await request(app).get('/api/user/13');
        expect(result.status).toEqual(404);
    });
});

describe('GET /api/user/1/avatar', (): void => {
    it('respond with user 1 avatar in base64', async (): Promise<void> => {
        const result = await request(app).get('/api/user/1/avatar');
        expect(result.text.startsWith('/9j/')).toBeTruthy();
        expect(result.status).toEqual(200);
    });
});

describe('DELETE /api/user/1/avatar', (): void => {
    it('deletes avatar and returns 204', async (): Promise<void> => {
        const result = await request(app).delete('/api/user/1/avatar');
        expect(result.status).toEqual(204);
    });
});

describe('DELETE /api/user/1/avatar', (): void => {
    it('respond 404 because its already deleted', async (): Promise<void> => {
        const result = await request(app).delete('/api/user/1/avatar');
        expect(result.status).toEqual(404);
    });
});
