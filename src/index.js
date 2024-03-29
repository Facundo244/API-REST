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


//Middleware para manejar errores
app.use((err , req , res ,next) =>{

    console.error(err.stack);
    res.status(500).json({ error : 'Hubo un error al intentar conectar con el servidor..'});
})

app.use('/', tasaRoutes);



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});