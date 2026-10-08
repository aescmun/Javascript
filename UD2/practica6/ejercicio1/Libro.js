class Libro{
  constructor(titulo, autor, numeroPaginas){
    if(titulo === null || titulo === undefined || titulo === ""){
      throw new error("El titulo no puede estar vacio")
    }

    if(autor === null || autor === undefined || autor === ""){
      throw new error("El autor no puede estar vacio")
    }

    if(isNaN(numeroPaginas) || numeroPaginas <= 0){
      throw new error("No puede tener paginas invalidas")
    }

    this.titulo = titulo;
    this.autor = autor;
    this.numeroPaginas = numeroPaginas;
  }

  describir(){
    document.body.innerHTML = ("<h1>"+this.titulo+"</h1>");
    document.body.innerHTML += ("<p>"+this.autor+"</p>");
    document.body.innerHTML += ("<p>"+this.numeroPaginas+"</p>");
  }

  esExtenso(){
    if(this.numeroPaginas >= 300){
      return true;
    }else return false;
  }
}

const libro = new Libro("PruebaLibro", "Alberto", 20);
libro.describir();
console.log(libro.esExtenso());