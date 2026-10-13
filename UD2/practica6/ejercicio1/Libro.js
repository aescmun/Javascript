class Libro{
  constructor(titulo, autor, numeroPaginas){
    if(titulo === null || titulo === undefined || titulo === ""){
      throw new Error("El titulo no puede estar vacio")
    }

    if(autor === null || autor === undefined || autor === ""){
      throw new Error("El autor no puede estar vacio")
    }

    if(isNaN(numeroPaginas) || numeroPaginas <= 0){
      throw new Error("No puede tener paginas invalidas")
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