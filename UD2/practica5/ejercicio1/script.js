const palabras = ["Sol", "montaña", "río", "bosque", "mariposa", "luz", "montaña"];


function contarPalabra(palabra){
  let cantidad = 0;
  for(let i = 0;i < palabras.length ; i++){
    if(palabra === palabras[i]){
      cantidad++;
    }
  }
  return cantidad;
}

function devolverArray(){
  let nuevo = [];

  for(let i = 0;i < palabras.length ; i++){
    if(palabras[i].length > 4){
      nuevo.push(palabras[i]);
    }
  }
  return nuevo;
}

function primeraPosicion(palabra){
  return palabras.indexOf(palabra);
}

console.log("Veces que aparece montaña: " + contarPalabra("montaña"));
console.log("Palabras con más de cuatro caracteres: " + devolverArray());
console.log("Primera posición de río: " + primeraPosicion("río"));
console.log("Primera posición de nube: "+ primeraPosicion("nube"));