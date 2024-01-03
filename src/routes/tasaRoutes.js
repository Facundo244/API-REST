const express = require('express');
const router = express.Router();
const tasaController = require('../controllers/tasaControllers');

// Ruta para consultar la tasa de operación
router.post('/consultarTasa', (req, res) => {

    const { marcaTarjeta, importe } = req.body;

    // Validar si se ingresa la marca de la tarjeta y un importe
    if (!marcaTarjeta || !importe) {
        return res.status(400).json({ error: 'Se requiere la marca de la tarjeta y el importe en el cuerpo de la solicitud.' });
    }
       
    
    const { tasa, total_mas_tasa } = tasaController.calcularTasa(marcaTarjeta, parseFloat(importe));
    res.json({ tasa, total_mas_tasa });
});

router.get('/consultarTasa/:marcaTarjeta/:importe', (req, res) => {

  const { marcaTarjeta, importe } = req.params;

  // Convertir el importe a número
  const monto = parseFloat(importe);
  

  // Validar si el importe es un número válido con IsNaN y monto <= 0
  if (isNaN(monto) || monto <= 0) {
      return res.status(400).json({ error: 'El importe debe ser un número válido y mayor que cero.' });
  }

  // Conjunto de marcas de tarjetas válidas
  const marcasValidas = ['visa', 'nara', 'amex']; // Agregar más marcas si es necesario como dice en enunciado que pueden ser mas en el futuro

  // Verificar si la marcaTarjeta está incluida en el conjunto de marcas válidas
  if (!marcasValidas.includes(marcaTarjeta.toLowerCase())) {
      return res.status(400).json({ error: 'Ingrese una marca de tarjeta válida.' });
  }

  const resultado = tasaController.calcularTasa(marcaTarjeta , monto);

  // Monstar resultado por JSON
  res.json(resultado);
});


//Exportando router 
module.exports = router;