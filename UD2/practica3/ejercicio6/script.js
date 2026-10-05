let inicio = Number(prompt("Introduce el primer número"));
let fin = Number(prompt("Introduce el segundo número"));

if (inicio > fin) {
  [inicio, fin] = [fin, inicio];
}

for (let i = inicio; i <= fin; i++) {
  console.log(i);
}