const secreto = Math.floor(Math.random() * 10) + 1;
let numero;

do {
  numero = Number(prompt("Adivina el número (entre 1 y 10)"));

  if (numero < secreto) {
    alert("El número secreto es mayor");
  } else if (numero > secreto) {
    alert("El número secreto es menor");
  }
} while (numero !== secreto);

alert("¡Has acertado! Era el " + secreto);