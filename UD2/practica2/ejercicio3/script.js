let nombre = "Alberto";
let apellidos = "Escalona Muñoz";

// a)
let completo = nombre + " " + apellidos;
console.log(completo);

// b)
console.log("Longitud: " + completo.length);

// c) 
console.log("Posiciones 7 a 10: " + completo.slice(7, 11));

// d)
let cambiado = completo.replace("Escalona", "Muñoz");
console.log(cambiado);

// e)
console.log(completo.toUpperCase());

// f)
console.log("Último carácter: " + completo.charAt(completo.length - 1));

// g)
let partes = completo.split(" ");
console.log(partes);

// h)
console.log("El apellido empieza en la posición " + completo.indexOf(apellidos));

// i)
console.log(`Bienvenido/a ${completo}`);

// j)
let iniciales = partes[0].charAt(0) + partes[1].charAt(0) + partes[2].charAt(0);
console.log("Iniciales: " + iniciales.toUpperCase());