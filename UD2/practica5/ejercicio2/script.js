const pasillo = ["S", ".", "#", ".", ".", "."];
const ordenes = ["derecha", "derecha", "izquierda", "izquierda"];
const rechazos = [];
let posicion = pasillo.indexOf("S");

function calcularDestino(orden){
  if(orden === "derecha"){
    return posicion + 1;
  }
  return posicion - 1;
}

for(let i = 0; i < ordenes.length; i++){
  const destino = calcularDestino(ordenes[i]);

  if(destino < 0 || destino >= pasillo.length){
    console.log(ordenes[i] + ": rechazado; el destino queda fuera del pasillo");
    rechazos.push(ordenes[i]);
  } else if(pasillo[destino] === "#"){
    console.log(ordenes[i] + ": rechazado; hay un obstáculo en la posición " + destino);
    rechazos.push(ordenes[i]);
  } else {
    posicion = destino;
    console.log(ordenes[i] + ": aceptado; posición " + posicion);
  }
}

const pasilloFinal = [...pasillo];
pasilloFinal[posicion] = "R";

console.log("Órdenes rechazadas:", rechazos);
console.log("Pasillo final:", pasilloFinal);