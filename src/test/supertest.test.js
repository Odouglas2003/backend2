/*import { expect } from 'chai';
import supertest from 'supertest'
import { describe, it } from 'mocha'

const request = supertest('http://localhost:3000');

describe('Testing de la API', () => {
    it('Debería devolver un mensaje de bienvenida', async () => {
        const userMock = {
            "first_name": "Juan",
            "last_name": "Pérez",
            "email": "juan.perez@example.com",
            "password": "123456"
        };

        const response = await request.post('/register').send(userMock);
        console.log('Estado:', response.status);
        console.log('Cuerpo:', response.body);

        // Ajusta según el comportamiento esperado (400 o 200)
        expect(response.status).to.be.oneOf([400, 200]);
    });

    it('El endpoint GET /api/sessions/current debería devolver un usuario', async () => {
        const response = await request.get('/api/sessions/current');
        console.log('Estado:', response.status);
        console.log('Cuerpo:', response.body);

        expect(response.status).to.equal(200); // Cambiar si se espera otro estado
        expect(response.body).to.have.property('user'); // Asegura que devuelve un usuario
    });
});


//"test": "mocha test/supertest.test.js",
*/