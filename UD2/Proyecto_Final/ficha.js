const estado = document.querySelector("#estado-ficha");
const ficha = document.querySelector("#ficha-pokemon");

if (estado === null || ficha === null) {
  throw new Error("Falta un elemento necesario en ficha.html");
}

function mostrarEstado(texto, esError) {
  estado.textContent = texto;
  if (esError) {
    estado.classList.add("error");
  } else {
    estado.classList.remove("error");
  }
}

async function obtenerDatos(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  return respuesta.json();
}

function mostrarFicha(pokemon) {
  const titulo = document.createElement("h2");
  titulo.textContent = pokemon.name;

  const imagen = document.createElement("img");
  imagen.src = pokemon.sprites.other["official-artwork"].front_default;
  imagen.alt = pokemon.name;

  const numero = document.createElement("p");
  numero.textContent = `Número: ${pokemon.id}`;

  const altura = document.createElement("p");
  altura.textContent = `Altura: ${pokemon.height / 10} m`;

  const peso = document.createElement("p");
  peso.textContent = `Peso: ${pokemon.weight / 10} kg`;

  const tituloTipos = document.createElement("h3");
  tituloTipos.textContent = "Tipos";

  const listaTipos = document.createElement("ul");
  for (const tipo of pokemon.types) {
    const elemento = document.createElement("li");
    elemento.textContent = tipo.type.name;
    listaTipos.append(elemento);
  }

  const tituloHabilidades = document.createElement("h3");
  tituloHabilidades.textContent = "Habilidades";

  const listaHabilidades = document.createElement("ul");
  for (const habilidad of pokemon.abilities) {
    const elemento = document.createElement("li");
    elemento.textContent = habilidad.ability.name;
    listaHabilidades.append(elemento);
  }

  ficha.replaceChildren(
    titulo,
    imagen,
    numero,
    altura,
    peso,
    tituloTipos,
    listaTipos,
    tituloHabilidades,
    listaHabilidades
  );
}

async function cargarFicha() {
  const parametros = new URLSearchParams(window.location.search);
  const nombre = parametros.get("pokemon");

  if (nombre === null || nombre.trim() === "") {
    mostrarEstado("No se ha indicado ningún Pokémon. Vuelve al índice.", true);
    return;
  }

  mostrarEstado("Cargando ficha…", false);

  try {
    const pokemon = await obtenerDatos(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`);
    mostrarFicha(pokemon);
    mostrarEstado("", false);
  } catch (error) {
    console.error("No se pudo cargar la ficha:", error);
    if (error.message === "Error HTTP: 404") {
      mostrarEstado("No existe ningún Pokémon con ese nombre.", true);
    } else {
      mostrarEstado("No se ha podido cargar la ficha. Revisa tu conexión.", true);
    }
  }
}

cargarFicha();