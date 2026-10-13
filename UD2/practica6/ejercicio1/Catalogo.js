class Catalogo{
  constructor(...libros){
    this.libros = libros;
  }

  buscarPosicion(titulo){
    for(let i = 0; i < this.libros.length; i++){
      if(this.libros[i].titulo === titulo){
        return i;
      }
    }
    return -1;
  }

  agregar(libro){
    if(this.buscarPosicion(libro.titulo) !== -1){
      console.log("Ya existe un libro con el título " + libro.titulo);
    }else{
      this.libros.push(libro);
      console.log("Libro añadido: " + libro.titulo);
    }
  }

  eliminar(titulo){
    const posicion = this.buscarPosicion(titulo);
    if(posicion === -1){
      console.log("No existe ningún libro con el título " + titulo);
    }else{
      this.libros.splice(posicion, 1);
      console.log("Libro eliminado: " + titulo);
    }
  }

  consultar(titulo){
    const posicion = this.buscarPosicion(titulo);
    if(posicion === -1){
      console.log("No existe ningún libro con el título " + titulo);
      return null;
    }
    return this.libros[posicion];
  }

  listar(){
    document.body.innerHTML += "<h2>Catálogo</h2>";
    if(this.libros.length === 0){
      document.body.innerHTML += "<p>El catálogo está vacío</p>";
    }else{
      for(let i = 0; i < this.libros.length; i++){
        document.body.innerHTML += "<h3>" + this.libros[i].titulo + "</h3>";
        document.body.innerHTML += "<p>" + this.libros[i].autor + "</p>";
        document.body.innerHTML += "<p>" + this.libros[i].numeroPaginas + "</p>";
      }
    }
  }
}

function probarLibro(titulo, autor, numeroPaginas){
  try{
    new Libro(titulo, autor, numeroPaginas);
  }catch(e){
    console.log("Error: " + e.message);
  }
}

const libro1 = new Libro("Viaje al norte", "Ana López", 299);
const libro2 = new Libro("Mar de fondo", "Luis Martín", 300);
const libro3 = new Libro("Historias cortas", "Marta Ruiz", 120);

libro3.describir();
console.log(libro1.titulo + " es extenso: " + libro1.esExtenso());
console.log(libro2.titulo + " es extenso: " + libro2.esExtenso());
console.log(libro3.titulo + " es extenso: " + libro3.esExtenso());

probarLibro("", "Ana López", 100);
probarLibro("Sin autor", "", 100);
probarLibro("Sin páginas", "Ana López", 0);

const catalogo = new Catalogo();
catalogo.agregar(libro1);
catalogo.agregar(libro2);
catalogo.agregar(libro3);
catalogo.agregar(new Libro("Mar de fondo", "Otro autor", 50));
catalogo.listar();

const encontrado = catalogo.consultar("Mar de fondo");
console.log("Autor de Mar de fondo: " + encontrado.autor);
catalogo.consultar("Libro inexistente");

catalogo.eliminar("Viaje al norte");
catalogo.eliminar("Libro inexistente");
catalogo.listar();

libro3.titulo = "Historias largas";
console.log(libro1.titulo + ", " + libro2.titulo + ", " + libro3.titulo);