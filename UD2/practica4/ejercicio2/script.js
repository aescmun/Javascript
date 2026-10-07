function mostrarParametros(parametro1, parametro2, parametro3, ...resto) {
  console.log("Parámetros fijos:", parametro1, parametro2, parametro3);
  console.log("Resto de parámetros:", resto);
}

mostrarParametros(1, 2, 3, 4, 5);