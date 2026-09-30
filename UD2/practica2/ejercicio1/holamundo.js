const fecha = new Date();
alert("¡Bienvenidos a mi primer ejercicio!" + "\n" + new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(fecha));
console.log("Realizado por Alberto Escalona Muñoz"); 