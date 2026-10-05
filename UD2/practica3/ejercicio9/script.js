const contrasena = "1234";
let intento = prompt("Introduce la contraseña");

while (intento !== contrasena) {
  intento = prompt("Contraseña incorrecta, vuelve a intentarlo");
}

alert("Contraseña correcta");