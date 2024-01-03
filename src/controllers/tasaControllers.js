//Libreria que use para las cuentas del dia presente
const { DateTime } = require('luxon');


// Función para simular el cálculo de la tasa
function calcularTasa(marcaTarjeta, importe) {
    
    let tasa;
    
    //use la libreria Luxon para usar este tipo de DateTime (y buscar la fecha acutal)
    const fechaActual = DateTime.now();

    // segui usando la libreria luxon para editar el formato del anio y que solo aparezcan los 2 ultimos numeros
    let ultimosDosDigitosDelAnio = fechaActual.toFormat('yy');


    marcaTarjeta = marcaTarjeta.toLowerCase();
    

    if (marcaTarjeta === 'visa') {

        tasa = ultimosDosDigitosDelAnio / fechaActual.month; 
        
    } else if (marcaTarjeta === 'nara') {

        tasa = fechaActual.day * 0.5; 

    } else if (marcaTarjeta === 'amex') {

        tasa = fechaActual.month * 0.1; 
    }

    
    // Calculando el total con la tasa incluida
    const total = importe + (importe * tasa);

    //return en formato JSON 
    return { tasa:tasa , total_mas_tasa : total};

}


module.exports = { calcularTasa };