function motivoError(entrada) {
  if (entrada === null || entrada.trim() === "") return "No has introducido ningún valor.";
  if (isNaN(entrada)) return "El valor debe ser un número.";
  if (Number(entrada) <= 0) return "El valor debe ser mayor que cero.";
  return "";
}

function pedirPositivo(mensaje) {
  let entrada = prompt(mensaje);
  while (motivoError(entrada) !== "") {
    alert(motivoError(entrada));
    entrada = prompt(mensaje);
  }
  return Number(entrada);
}

function pedirPrecio() {
  let entrada = prompt("Precio del litro en €");
  while (entrada !== null && entrada.trim() !== "" && motivoError(entrada) !== "") {
    alert(motivoError(entrada));
    entrada = prompt("Precio del litro en €:");
  }
  if (entrada === null || entrada.trim() === "") return undefined;
  return Number(entrada);
}

function pedirViajeros() {
  let viajeros = pedirPositivo("Número de viajeros:");
  while (!Number.isInteger(viajeros)) {
    alert("El número de viajeros debe ser un número entero.");
    viajeros = pedirPositivo("Número de viajeros:");
  }
  return viajeros;
}

function calcularLitros(distancia, consumo) {
  return (distancia * consumo) / 100;
}

function calcularCosteTotal(litros, precio = 1.6) {
  return litros * precio;
}

function calcularCostePorViajero(costeTotal, viajeros) {
  return costeTotal / viajeros;
}

function mostrarResultado(etiqueta, calcular, ...datos) {
  console.log(`${etiqueta}: ${calcular(...datos).toFixed(2)} €`);
}

const distancia = pedirPositivo("Distancia del viaje en km:");
const consumo = pedirPositivo("Consumo en litros cada 100 km:");
const precio = pedirPrecio();
const viajeros = pedirViajeros();

const litros = calcularLitros(distancia, consumo);
const costeTotal = calcularCosteTotal(litros, precio);

console.log(`Combustible estimado: ${litros.toFixed(2)} l`);
mostrarResultado("Coste total", calcularCosteTotal, litros, precio);
mostrarResultado("Coste por viajero", calcularCostePorViajero, costeTotal, viajeros);