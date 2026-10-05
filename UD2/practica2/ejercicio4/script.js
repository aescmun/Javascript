let hoy = new Date();

// a)
console.log("Día: " + hoy.getDate());

// b) 
console.log("Mes: " + (hoy.getMonth() + 1));

// c)
console.log("Año: " + hoy.getFullYear());

// d)
let formato = new Intl.DateTimeFormat("es-ES", { dateStyle: "full" });
console.log(formato.format(hoy));