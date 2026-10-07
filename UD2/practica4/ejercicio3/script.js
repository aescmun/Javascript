function saludar(nombre1, nombre2, nombre3, nombre4) {
  console.log(`Hola, ${nombre1}, ${nombre2}, ${nombre3} y ${nombre4}`);
}

const nombres = ["Jaime", "Manuel", "Ayoub", "Sergio"];
saludar(...nombres);