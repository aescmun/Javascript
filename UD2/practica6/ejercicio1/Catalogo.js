class Catalogo{
  constructor(...libros){
    this.libros = libros;
  }

  agregar(Libro){
    this.libros.push(libro);
  }
}

let libros = [];
let catalogo =  new Catalogo(libros);
catalogo.agregar(libro);
console.log(catalogo.libros);