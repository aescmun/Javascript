function esNotaValida(entrada) {
  if (entrada === null || entrada.trim() === "") return false;
  const nota = Number(entrada);
  return !isNaN(nota) && nota >= 0 && nota <= 10;
}

function pedirNota() {
  let entrada = prompt("Introduce una nota (0-10) o -1 para terminar:");
  while (Number(entrada) !== -1 && !esNotaValida(entrada)) {
    entrada = prompt("Nota no válida. Introduce una nota (0-10) o -1 para terminar:");
  }
  return Number(entrada);
}

function clasificarNota(nota) {
  if (nota < 5) return "Suspenso";
  if (nota < 7) return "Aprobado";
  if (nota < 9) return "Notable";
  return "Sobresaliente";
}

function calcularMedia(suma, cantidad) {
  return suma / cantidad;
}

let cantidad = 0;
let suma = 0;
let maxima = 0;
let minima = 10;

let nota = pedirNota();
while (nota !== -1) {
  console.log(`${nota}: ${clasificarNota(nota)}`);
  cantidad++;
  suma += nota;
  if (nota > maxima) maxima = nota;
  if (nota < minima) minima = nota;
  nota = pedirNota();
}

if (cantidad === 0) {
  console.log("No se ha introducido ninguna nota.");
} else {
  console.log(`Notas introducidas: ${cantidad}`);
  console.log(`Media: ${calcularMedia(suma, cantidad).toFixed(2)}`);
  console.log(`Nota máxima: ${maxima}`);
  console.log(`Nota mínima: ${minima}`);
}