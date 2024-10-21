
// Define una ruta POST en el servidor para crear un nuevo pedido.
// La URL es '/api/pedido', y espera que se le envíe un cuerpo de datos (req.body) con los detalles del pedido.
app.post('/api/pedido', async (req, res) => {
    try {
        // Desestructura los valores 'productoId', 'cantidad', y 'direccionEnvio' del cuerpo de la solicitud (req.body).
        // Esto significa que se espera recibir un objeto JSON con estos campos desde el frontend.
        const { productoId, cantidad, direccionEnvio } = req.body;

        // Hacer una llamada a la API del proveedor para crear un pedido.
        // Se utiliza axios para enviar una solicitud POST a la URL de la API del proveedor.
        // La URL se obtiene desde una variable de entorno llamada PROVEEDOR_API_URL.
        // En el cuerpo de la solicitud (payload) se envían la clave de API, el ID del producto, la cantidad y la dirección de envío.
        const response = await axios.post(`${process.env.PROVEEDOR_API_URL}/create-order`, {
            apiKey: process.env.PROVEEDOR_API_KEY,
            productoId: productoId,
            cantidad: cantidad,
            direccionEnvio: direccionEnvio
        });

        // Verifica si la respuesta de la API indica que el pedido se creó exitosamente.
        if (response.data.success) {
            // Si el pedido fue creado con éxito, responde al frontend con un mensaje de éxito.
            // Incluye el ID del pedido y el número de seguimiento (trackingNumber) proporcionados por la API del proveedor.
            res.json({
                message: 'Pedido creado exitosamente',
                orderId: response.data.orderId,
                trackingNumber: response.data.trackingNumber
            });
        } else {
            // Si la respuesta de la API indica un fallo, responde con un error 500 (Internal Server Error).
            // Esto indica al frontend que hubo un problema al intentar crear el pedido con el proveedor.
            res.status(500).json({ error: 'Error al crear el pedido con el proveedor' });
        }
    } catch (error) {
        // Si ocurre cualquier error durante la llamada a la API o en el proceso, se captura en el bloque 'catch'.
        // Muestra el error en la consola para facilitar el diagnóstico del problema.
        console.error('Error al crear el pedido:', error);

        // Responde con un error 500 (Internal Server Error) al frontend,
        // indicando que hubo un problema interno en el servidor.
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});