let num1 = Number(prompt("Introduce el primer número"));
let num2 = Number(prompt("Introduce el segundo número"));

if (num1 === num2) {
  alert("Los dos números son iguales");
} else if (num1 > num2) {
  alert(num1 + " es mayor que " + num2);
} else {
  alert(num2 + " es mayor que " + num1);
}