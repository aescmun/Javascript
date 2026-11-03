const formulario = document.querySelector("#formulario-busqueda");
const campoNombre = document.querySelector("#nombre-pokemon");
const estado = document.querySelector("#estado-busqueda");
const listado = document.querySelector("#listado-pokemon");

if (
  formulario === null ||
  campoNombre === null ||
  estado === null ||
  listado === null
) {
  throw new Error("Falta un elemento necesario en index.html");
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

function crearTarjeta(pokemon) {
  const partes = pokemon.url.split("/");
  const numero = partes[partes.length - 2];

  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const imagen = document.createElement("img");
  imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png`;
  imagen.alt = pokemon.name;
  imagen.loading = "lazy";

  const nombre = document.createElement("h3");
  nombre.textContent = pokemon.name;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = "Ficha completa";
  boton.setAttribute("data-nombre", pokemon.name);

  tarjeta.append(imagen, nombre, boton);
  return tarjeta;
}

async function cargarListado() {
  mostrarEstado("Cargando Pokémon…", false);

  try {
    const datos = await obtenerDatos("https://pokeapi.co/api/v2/pokemon?limit=20");
    listado.replaceChildren();

    for (const pokemon of datos.results) {
      listado.append(crearTarjeta(pokemon));
    }

    mostrarEstado("Listado cargado", false);
  } catch (error) {
    console.error("No se pudo cargar el listado:", error);
    mostrarEstado("No se ha podido cargar el listado. Revisa tu conexión.", true);
  }
}

listado.addEventListener("click", evento => {
  if (!(evento.target instanceof Element)) {
    return;
  }

  const boton = evento.target.closest("button[data-nombre]");
  if (boton !== null) {
    const nombre = boton.getAttribute("data-nombre");
    window.location.href = `ficha.html?pokemon=${encodeURIComponent(nombre)}`;
  }
});

formulario.addEventListener("submit", async evento => {
  evento.preventDefault();
  const nombre = campoNombre.value.trim().toLowerCase();

  if (nombre === "") {
    mostrarEstado("Escribe el nombre de un Pokémon.", true);
    return;
  }

  mostrarEstado("Buscando…", false);

  try {
    const pokemon = await obtenerDatos(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`);
    window.location.href = `ficha.html?pokemon=${encodeURIComponent(pokemon.name)}`;
  } catch (error) {
    console.error("No se pudo buscar el Pokémon:", error);
    if (error.message === "Error HTTP: 404") {
      mostrarEstado("No se ha encontrado ese Pokémon.", true);
    } else {
      mostrarEstado("Ha habido un error de conexión. Inténtalo de nuevo.", true);
    }
  }
});

cargarListado();