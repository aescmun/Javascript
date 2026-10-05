let opcion = prompt("Elige una opción:\n1. Usuario principiante\n2. Usuario intermedio\n3. Usuario avanzado\n4. Salir");

switch (opcion) {
  case "1":
    alert("Eres un usuario principiante");
    break;
  case "2":
    alert("Eres un usuario intermedio");
    break;
  case "3":
    alert("Eres un usuario avanzado");
    break;
  case "4":
    alert("Has salido del programa");
    break;
  default:
    alert("Opción no válida");
}