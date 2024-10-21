
// Define una ruta GET en el servidor para obtener el estado de un pedido específico.
// La URL incluye un parámetro dinámico ':orderId' que representa el ID del pedido.
app.get('/api/pedido/:orderId/status', async (req, res) => {
    try {
        // Extrae el 'orderId' de los parámetros de la URL (req.params).
        // Esto significa que si la URL es '/api/pedido/123/status', 'orderId' será '123'.
        const { orderId } = req.params;

        // Llama a la API del proveedor para obtener el estado del pedido.
        // Se utiliza 'axios' para hacer una solicitud GET a la URL del proveedor.
        // 'params' contiene la clave de API (para autenticarse) y el ID del pedido.
        const response = await axios.get(`${process.env.PROVEEDOR_API_URL}/order-status`, {
            params: {
                apiKey: process.env.PROVEEDOR_API_KEY,
                orderId: orderId
            }
        });

        // Verifica si la respuesta de la API indica que se obtuvo el estado correctamente.
        if (response.data.success) {
            // Si la API devuelve éxito, envía una respuesta JSON al frontend
            // con el estado del pedido y el número de seguimiento (trackingNumber).
            res.json({
                status: response.data.status, // Estado actual del pedido (por ejemplo, 'Enviado', 'Procesando', etc.)
                trackingNumber: response.data.trackingNumber // Número de seguimiento para el cliente.
            });
        } else {
            // Si la API del proveedor no pudo obtener el estado del pedido, responde con un error 500 (Internal Server Error).
            res.status(500).json({ error: 'Error al obtener el estado del pedido' });
        }
    } catch (error) {
        // Si ocurre un error en el proceso (por ejemplo, problemas de conexión), se captura en el bloque 'catch'.
        // Muestra el error en la consola para facilitar el diagnóstico del problema.
        console.error('Error al obtener el estado del pedido:', error);

        // Responde con un error 500 (Internal Server Error) al frontend, indicando que hubo un problema interno en el servidor.
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});