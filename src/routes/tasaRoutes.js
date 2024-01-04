const express = require('express');
const router = express.Router();
const tasaController = require('../controllers/tasaControllers');

// Ruta para consultar la tasa de operación para enviar solicitudes en formato JSON mediante una solicitud POST
router.post('/consultarTasa', (req, res) => {

    // Obtener los datos del cuerpo de la solicitud POST
    const { marcaTarjeta, importe } = req.body;

    const monto = parseFloat(importe);

    // Llamar al controlador para calcular la tasa 
    const resultado = tasaController.calcularTasa(marcaTarjeta, monto);

    //Enviar la respuesta en formato JSON
    res.json(resultado);
});

//Ruta para consultar la tasa de operación mediante una solicitud GET con parámetros en la URL
router.get('/consultarTasa/:marcaTarjeta/:importe', (req, res) => {

  // Obtener los parámetros de la URL
  const { marcaTarjeta, importe } = req.params;

  const monto = parseFloat(importe);

  //LLamar al controlador  para calcular la tasa con los parametros dados en la URL
  const resultado = tasaController.calcularTasa(marcaTarjeta, monto);

  res.json(resultado);
});


//Exportando router 
module.exports = router;