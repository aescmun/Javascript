let num1 = Number(prompt("Introduce el primer número"));
let num2 = Number(prompt("Introduce el segundo número"));

if (!Number.isFinite(num1) || !Number.isFinite(num2) || num1 === 0 || num2 === 0) {
  alert("Error: tienes que introducir números válidos y distintos de 0");
} else if (num1 === num2) {
  alert("Los dos números son iguales");
} else if (num1 > num2) {
  alert(num1 + " es mayor que " + num2);
} else {
  alert(num2 + " es mayor que " + num1);
}