let radio = 3.5;
const PI = Number(Math.PI.toFixed(5));

if (Number.isFinite(radio) && radio > 0) {
  const area = PI * radio ** 2;

  // a)
  console.log("Área: " + area);

  // b)
  const areaTexto = String(area);
  console.log("Área como string: " + areaTexto);

  // c)
  console.log("Área con 3 decimales: " + area.toFixed(3));

  // d)
  console.log("Área entera: " + parseInt(area));

  // e)
  console.log("Área redondeada: " + Math.round(area));

  // f)
  const aleatorio = Math.floor(Math.random() * 20) + 1;
  console.log("Número aleatorio: " + aleatorio);
  console.log("Área x aleatorio: " + area * aleatorio);
} else {
  console.log("El radio no es válido");
}