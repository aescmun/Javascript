const fecha = new Date();
alert("¡Bienvenidos a mi primer ejercicio!" + "\n" + new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(fecha));
