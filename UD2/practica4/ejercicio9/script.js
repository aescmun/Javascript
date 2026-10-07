function generarSecreto() {
  return Math.floor(Math.random() * 100) + 1;
}

function obtenerIntentos(dificultad) {
  switch (dificultad) {
    case "1":
      return 10;
    case "2":
      return 7;
    case "3":
      return 5;
    default:
      return 0;
  }
}

function esIntentoValido(entrada) {
  if (entrada === null || entrada.trim() === "") return false;
  const numero = Number(entrada);
  return Number.isInteger(numero) && numero >= 1 && numero <= 100;
}

function pedirIntento(numero, maximo) {
  let entrada = prompt(`Intento ${numero} de ${maximo}. Escribe un número del 1 al 100:`);
  while (!esIntentoValido(entrada)) {
    entrada = prompt("Valor no válido. Escribe un número entero del 1 al 100:");
  }
  return Number(entrada);
}

function comparar(intento, secreto) {
  if (intento < secreto) return "mayor";
  if (intento > secreto) return "menor";
  return "acierto";
}

function jugarRonda(maxIntentos) {
  const secreto = generarSecreto();
  let puntos = 0;

  for (let i = 1; i <= maxIntentos; i++) {
    const resultado = comparar(pedirIntento(i, maxIntentos), secreto);
    if (resultado === "acierto") {
      alert(`¡Has acertado! El número era ${secreto}.`);
      return puntos + 100;
    }
    alert(`Prueba con un número ${resultado}.`);
    puntos -= 10;
  }

  alert(`Se han acabado los intentos. El número era ${secreto}.`);
  return puntos;
}

function jugar(dificultadInicial = "2") {
  let puntuacion = 0;
  let dificultad = dificultadInicial;
  let opcion;

  do {
    opcion = prompt(
      "Elige la dificultad:\n1. Fácil (10 intentos)\n2. Normal (7 intentos)\n3. Difícil (5 intentos)\n4. Salir",
      dificultad
    );
    const intentos = obtenerIntentos(opcion);

    if (intentos > 0) {
      dificultad = opcion;
      const puntosRonda = jugarRonda(intentos);
      puntuacion += puntosRonda;
      alert(`Puntos de la ronda: ${puntosRonda}\nPuntuación acumulada: ${puntuacion}`);
    } else if (opcion !== "4") {
      alert("Opción no válida.");
    }
  } while (opcion !== "4");

  alert(`Puntuación final: ${puntuacion}`);
}

jugar();