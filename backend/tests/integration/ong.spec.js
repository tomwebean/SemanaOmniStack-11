const req = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => { 
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const res = await req(app)
    .post('/ongs')
    .send({
      name: "APAD2",
      email: "contato@apad.com",
      whatsapp: "11911223344",
      city: "Jundiai",
      uf: "SP"
    });

    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toHaveLength(8);
  });
});