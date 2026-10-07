function analizar(...numeros) {
  if (numeros.length === 0) {
    return { error: "No se han recibido números." };
  }

  for (const numero of numeros) {
    if (!Number.isFinite(numero)) {
      return { error: `Valor no válido: ${numero}. No se ha generado el informe.` };
    }
  }

  let suma = 0;
  let minimo = numeros[0];
  let maximo = numeros[0];

  for (const numero of numeros) {
    suma += numero;
    if (numero < minimo) minimo = numero;
    if (numero > maximo) maximo = numero;
  }

  return {
    suma: suma,
    media: suma / numeros.length,
    minimo: minimo,
    maximo: maximo,
  };
}

function mostrarInforme(informe) {
  if (informe.error) {
    console.log(informe.error);
    return;
  }
  console.log(
    `Suma: ${informe.suma} | Media: ${informe.media.toFixed(2)} | Mínimo: ${informe.minimo} | Máximo: ${informe.maximo}`
  );
}

const datos = [3, -7, 10];
const vacio = [];

mostrarInforme(analizar(4, 8, 15, 16, 23, 42));
mostrarInforme(analizar(...datos));
mostrarInforme(analizar(...vacio));
mostrarInforme(analizar(5));
mostrarInforme(analizar(2, 2, 2));
mostrarInforme(analizar(-5, -1, -10));
mostrarInforme(analizar(1, "2", 3));