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
       
    const resultado = tasaController.calcularTasa(marcaTarjeta, importe);

    res.json(resultado);
});

router.get('/consultarTasa/:marcaTarjeta/:importe', (req, res) => {

  const { marcaTarjeta, importe } = req.params;

  // Convertir el importe a número
  const monto = parseFloat(importe);
  
  const marcasValidas = ['visa' , 'nara' , 'amex']; // Se puede y agregando mas ya que el enunciado del principio dice que van a irse agregando

  //Verifica si esta incluida en la constante de marcasValidas
  if(!marcasValidas.includes(marcaTarjeta.toLowerCase())){

    return res.status(400).json({error: 'Ingrese una marca de tarjeta valida..'})
  }

  // Validar si el importe es un número válido con IsNaN y monto <= 0
  if (isNaN(monto) || monto <= 0) {
      return res.status(400).json({ error: 'El importe debe ser un número válido y mayor que cero.' });
  }

  const resultado = tasaController.calcularTasa(marcaTarjeta, monto);

  res.json(resultado);
});


//Exportando router 
module.exports = router;