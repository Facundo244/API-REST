const express = require('express');
const app = express();
const PORT = 4000;
const tasaRoutes = require('./routes/tasaRoutes');


// Middleware para manejar JSON
app.use(express.json());

// Ruta de inicio
app.get("/", (req, res) => {

    res.json({message: 'Bienvenido a la REST API'});
});


app.use('/', tasaRoutes);



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});