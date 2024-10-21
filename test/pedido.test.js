// Importamos las librerías necesarias
const request = require('supertest');
const express = require('express');
const app = require('../index'); // Asegúrate de que la ruta apunte a tu archivo principal (index.js)

// Test para verificar que la ruta GET / funciona correctamente.
describe('GET /', () => {
  it('debe responder con un mensaje de éxito', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Servidor de la tienda online está funcionando.');
  });
});