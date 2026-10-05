let palabra = prompt("Escribe una palabra").toLowerCase();
let vocales = "aeiouáéíóú";
let contador = 0;

for (const letra of palabra) {
  if (vocales.includes(letra)) {
    contador++;
  }
}

alert("La palabra tiene " + contador + " vocales");