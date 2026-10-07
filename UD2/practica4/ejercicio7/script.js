function celsiusAFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitACelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function kmAMillas(km) {
  return km / 1.609344;
}

function millasAKm(millas) {
  return millas * 1.609344;
}

function eurosADolares(euros, cambio = 1.01) {
  return euros / cambio;
}

function dolaresAEuros(dolares, cambio = 1.01) {
  return dolares * cambio;
}

function pedirNumero(mensaje) {
  let entrada = prompt(mensaje);
  while (entrada === null || entrada.trim() === "" || isNaN(entrada)) {
    entrada = prompt("Valor no válido. " + mensaje);
  }
  return Number(entrada);
}

function pedirCambio() {
  let entrada = prompt("Tasa de cambio: cuántos € vale 1 $ (déjalo vacío para usar 1.01):");
  while (entrada !== null && entrada.trim() !== "" && (isNaN(entrada) || Number(entrada) <= 0)) {
    entrada = prompt("Tasa no válida. Cuántos € vale 1 $ (déjalo vacío para usar 1.01):");
  }
  if (entrada === null || entrada.trim() === "") return undefined;
  return Number(entrada);
}

function mostrarConversion(valor, convertir, origen, destino, cambio) {
  console.log(`${valor} ${origen} equivalen a ${convertir(valor, cambio).toFixed(2)} ${destino}`);
}

function ejecutarOpcion(opcion) {
  switch (opcion) {
    case "1":
      mostrarConversion(pedirNumero("Grados Celsius:"), celsiusAFahrenheit, "ºC", "ºF");
      return;
    case "2":
      mostrarConversion(pedirNumero("Grados Fahrenheit:"), fahrenheitACelsius, "ºF", "ºC");
      return;
    case "3":
      mostrarConversion(pedirNumero("Kilómetros:"), kmAMillas, "km", "millas");
      return;
    case "4":
      mostrarConversion(pedirNumero("Millas:"), millasAKm, "millas", "km");
      return;
    case "5":
      mostrarConversion(pedirNumero("Euros:"), eurosADolares, "€", "$", pedirCambio());
      return;
    case "6":
      mostrarConversion(pedirNumero("Dólares:"), dolaresAEuros, "$", "€", pedirCambio());
      return;
    case "7":
      console.log("Programa terminado.");
      return;
    default:
      alert("Opción no válida.");
  }
}

let opcion;
do {
  opcion = prompt(
    "1. Celsius a Fahrenheit\n2. Fahrenheit a Celsius\n3. Kilómetros a millas\n4. Millas a kilómetros\n5. Euros a dólares\n6. Dólares a euros\n7. Salir"
  );
  ejecutarOpcion(opcion);
} while (opcion !== "7");