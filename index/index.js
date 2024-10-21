/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dani_mm__ <dani_mm__@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/10/21 11:06:28 by dani_mm__         #+#    #+#             */
/*   Updated: 2024/10/21 11:44:37 by dani_mm__        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// // Importamos el módulo 'express', que nos permite crear un servidor web de manera sencilla.
// const express = require('express');

// // Importamos el módulo 'axios', que nos permite hacer peticiones HTTP (como GET, POST) a otras APIs.
// const axios = require('axios');

// // Creamos una instancia de la aplicación de Express.
// const app = express();

// // Definimos el puerto en el que el servidor va a escuchar.
// // Si la variable de entorno PORT está definida, la usará, de lo contrario usará el puerto 3000.
// const PORT = process.env.PORT || 3000;

// // Middleware para poder recibir y procesar datos JSON en las peticiones.
// // Esto es útil cuando queremos enviar y recibir datos en formato JSON desde el frontend.
// app.use(express.json());

// // Creamos una ruta 'GET' en la raíz ('/') del servidor.
// // Cuando un cliente accede a esta ruta, el servidor responde con un mensaje de texto.
// app.get('/', (req, res) => {
//     res.send('Servidor de la tienda online está funcionando.');
// });

// // Hacemos que la aplicación de Express empiece a escuchar en el puerto definido.
// // La función de callback imprime un mensaje en la consola indicando que el servidor está en funcionamiento.
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor de la tienda online está funcionando.');
});

// Aquí exportamos la aplicación sin usar app.listen directamente
module.exports = app;