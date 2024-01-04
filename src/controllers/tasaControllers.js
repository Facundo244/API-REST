//Libreria que use para las cuentas del dia presente
const { DateTime } = require('luxon');


// Función para simular el cálculo de la tasa
function calcularTasa(marcaTarjeta, importe) {

    let tasa;

    //use la libreria Luxon para usar este tipo de DateTime (y buscar la fecha acutal)
    const fechaActual = DateTime.now();

    // segui usando la libreria luxon para editar el formato del anio y que solo aparezcan los 2 ultimos numeros
    let ultimosDosDigitosDelAnio = fechaActual.toFormat('yy');

    //Sirve para asegurar que las cadenas de texto no sean sensibles a la diferencias de Mayuscula/Minuscula
    marcaTarjeta = marcaTarjeta.toLowerCase();


    const marcasValidas = ['visa' , 'nara' ,'amex']; // Se puede y agregando mas ya que el enunciado del principio dice que van a irse agregando

    // Convertir el importe a número
    const monto = parseFloat(importe);
  

    // Validar si el importe es un número válido con IsNaN y monto <= 0
    if (isNaN(monto) || monto <= 0) {

      return { error: 'El importe debe ser un número válido y mayor que cero.' };

    }

    //Verifica si esta incluida en la constante de marcasValidas
    if(!marcasValidas.includes(marcaTarjeta.toLowerCase())){

        return {error: 'Ingrese una marca de tarjeta valida..'};
    }


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