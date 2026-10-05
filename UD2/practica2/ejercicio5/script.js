let edad = Number(prompt("¿Cuántos años tienes?"));
let nota = Number(prompt("¿Cuál es tu nota media?"));

// f) 
if (!Number.isFinite(edad) || !Number.isFinite(nota)) {
  console.log("La edad y la nota tienen que ser números");
} else if (nota < 0 || nota > 10) {
  console.log("La nota tiene que estar entre 0 y 10");
} else {
  // a)
  console.log("Nota: " + nota.toFixed(2));

  // b)
  console.log("Suma: " + (edad + nota));
  console.log("Resta: " + (edad - nota));
  console.log("Multiplicación: " + edad * nota);

  if (nota === 0) {
    console.log("No se puede dividir entre 0");
  } else {
    let division = edad / nota;
    console.log("División: " + division);

    // c)
    let divisionTexto = division.toString();
    console.log("División como string: " + divisionTexto);
    console.log(typeof divisionTexto);
  }

  // d)
  let estudiante = true;

  // e)
  console.log("edad es " + typeof edad);
  console.log("nota es " + typeof nota);
  console.log("estudiante es " + typeof estudiante);
}