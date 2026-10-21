const urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=5";
/*
const promesaRespuesta = fetch(urlPokemon);
console.log(promesaRespuesta);

promesaRespuesta
  .then(respuesta => {
    console.log("Respuesta recibida:", respuesta);
    return respuesta.json();
  })
  .then(pokemon => {
    console.log("Objeto pokemon:", pokemon);
    console.log("Tipo de dato:", typeof pokemon);
    console.log("Results:", pokemon.results);
    mostrarNombres(pokemon);
  });
  */

  
function mostrarNombres(pokemon) {
  const nombres = pokemon.results
    .map(nombres => `<li>${nombres.name}</li>`)
    .join("");

  document.body.innerHTML = `
    <h1>Listado de nombres</h1>
    <ul>${nombres}</ul>
  `;
}


const urlPokemonDetalles = "https://pokeapi.co/api/v2/pokemon/pikachu";
/*
const promesaRespuesta2 = fetch(urlPokemonDetalles);
console.log(promesaRespuesta2);

promesaRespuesta2
  .then(respuesta => {
    console.log("Respuesta recibida:", respuesta);
    return respuesta.json();
  })
  .then(pokemon => {
    console.log("Nombre:", pokemon.name);
    console.log("Número:", pokemon.id);
    console.log("Tipo:", pokemon.types[0].type.name);
    console.log("Imagen:", pokemon.sprites.front_default);
    mostrarPokemon(pokemon);
  });
*/

function mostrarPokemon(pokemon) { 
  document.body.innerHTML = `
    <h1>Detalle del Pokémon</h1>
    <article>
      <h2>${pokemon.name}</h2>
      <p>Número: ${pokemon.id}</p>
      <p>Tipo: ${pokemon.types[0].type.name}</p>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" height="300">
    </article>
  `;
}

/*fetch(urlPokemon)
  .then(respuesta => respuesta.json())
  .then(pokemon => {
    const urlPrimero = pokemon.results[0].url;
    console.log("URL del primer Pokémon:", urlPrimero);
    return fetch(urlPrimero);
  })
  .then(respuesta => respuesta.json())
  .then(pokemon => {
    mostrarPokemon(pokemon);
  });
  */

  function obtenerDatos(url) {
  return fetch(url).then(respuesta => {
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    return respuesta.json();
  });
}

/*
obtenerDatos(urlPokemonDetalles)
  .then(pokemon => {
    mostrarPokemon(pokemon);
  });
*/
/*
document.body.innerHTML = "<h1>Pokémon</h1><p>Cargando...</p>";

obtenerDatos(urlPokemonDetalles)
  .then(pokemon => {
    mostrarPokemon(pokemon);
  })
  .catch(error => {
    console.error("No se pudo obtener el Pokémon:", error.message);
    document.body.innerHTML = "<h1>Pokémon</h1><p>No se pudo cargar el Pokémon: " + error.message + "</p>";
  })
  .finally(() => {
    console.log("Petición terminada");
  });

  */

  function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
/*
document.body.innerHTML = "<h1>Pokémon</h1><p>Cargando...</p>";

esperar(5000)
  .then(() => {
    return obtenerDatos(urlPokemonDetalles);
  })
  .then(pokemon => {
    mostrarPokemon(pokemon);
  })
  .catch(error => {
    console.error("No se pudo obtener el Pokémon:", error.message);
    document.body.innerHTML = "<h1>Pokémon</h1><p>No se pudo cargar el Pokémon: " + error.message + "</p>";
  })
  .finally(() => {
    console.log("Petición terminada");
  });
*/

async function cargarPokemon() {
  document.body.innerHTML = "<h1>Pokémon</h1><p>Cargando...</p>";

  try {
    const pokemon = await obtenerDatos(urlPokemon);
    const urlPrimero = pokemon.results[0].url;
    console.log("URL del primer Pokémon:", urlPrimero);

    const detalle = await obtenerDatos(urlPrimero);
    mostrarPokemon(detalle);
  } catch (error) {
    console.error("No se pudo obtener el Pokémon:", error.message);
    document.body.innerHTML = "<h1>Pokémon</h1><p>No se pudo cargar el Pokémon: " + error.message + "</p>";
  } finally {
    console.log("Petición terminada");
  }
}

cargarPokemon();
  