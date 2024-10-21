// Importamos las librerías necesarias para los tests
const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta apunte a tu archivo principal (index.js)
const axios = require('axios');

// Creamos un mock de axios para simular las llamadas a la API del proveedor
jest.mock('axios');

// Agrupamos nuestros tests usando describe para que sea más fácil de leer
describe('POST /api/pedido', () => {

    // Test para verificar un pedido exitoso
    it('debe crear un pedido y devolver un orderId y trackingNumber', async () => {
        // Simular la respuesta de la API del proveedor para un pedido exitoso
        axios.post.mockResolvedValue({
            data: {
                success: true,
                orderId: '12345',
                trackingNumber: 'TRK123456'
            }
        });

        // Hacer una petición POST a nuestro servidor con los detalles del pedido
        const response = await request(app)
            .post('/api/pedido')
            .send({
                productoId: 'producto1',
                cantidad: 2,
                direccionEnvio: '123 Calle Falsa, Springfield'
            });

        // Verificar que la respuesta del servidor sea la esperada
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Pedido creado exitosamente',
            orderId: '12345',
            trackingNumber: 'TRK123456'
        });
    });

    //  Test para verificar cómo se maneja un error del proveedor
    it('debe manejar un error del proveedor', async () => {
        // Simular una respuesta de error de la API del proveedor
        axios.post.mockResolvedValue({
            data: {
                success: false
            }
        });

        // Hacer una petición POST a nuestro servidor con los detalles del pedido
        const response = await request(app)
            .post('/api/pedido')
            .send({
                productoId: 'producto1',
                cantidad: 2,
                direccionEnvio: '123 Calle Falsa, Springfield'
            });

        // Verificar que la respuesta del servidor sea un error 500 con el mensaje esperado
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Error al crear el pedido con el proveedor');
    });
});