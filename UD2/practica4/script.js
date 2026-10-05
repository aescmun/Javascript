let euro = Number(prompt("Dime un numero: "));
let conversor = 1.01;

function transformacion(euro, conversor) {
     let dolar = euro * conversor;
     console.log("Este es el euro sin convertir: " + euro);
     console.log("Este es el dolar convertido: " + dolar);
}