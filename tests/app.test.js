const request = require('supertest');
const { app, server } = require('../server');
 
describe('API Tests', () => {
 
  // Fermer le serveur après les tests
  afterAll((done) => { server.close(done); });
 
  test('GET / retourne le message de bienvenue', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('CI/CD Demo API');
    expect(res.body.status).toBe('running');
  });
 
  test('GET /health retourne status healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
 
  test('GET /add/3/4 retourne 7', async () => {
    const res = await request(app).get('/add/3/4');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(7);
  });
 
  test('GET /add/10/20 retourne 30', async () => {
    const res = await request(app).get('/add/10/20');
    expect(res.body.result).toBe(30);
  });
 
});
