const urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=5";

const promesaRespuesta = fetch(urlPokemon)
  .then(respuesta => {
    console.log("Respuesta recibida:", respuesta);
    return respuesta.json();
  })
  .then(pokemon => {
    console.log("Objeto pokemon:", pokemon);
    console.log("Tipo de dato:", typeof pokemon);
  });

  function mostrarNombres(pokemon) {
  const nombres = pokemon.nombres
    .map(nombres => `<li>${nombres}</li>`)
    .join("");

  document.body.innerHTML = `
    <h1>Listado de nombres</h1>
    <article>
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.url}" alt="${pokemon.name}" height="300">
      <p>${pokemon.name}</p>
      <h3>Nombres</h3>
      <ul>${nombres}</ul>
    </article>
  `;
}

const urlPokemonDetalles = "https://pokeapi.co/api/v2/pokemon/pikachu";

const promesaRespuesta2 = fetch(urlPokemonDetalles)
  .then(respuesta => {
    console.log("Respuesta recibida:", respuesta);
    return respuesta.json();
  })
  .then(pokemon => {
    console.log("Objeto pokemon:", pokemon);
    console.log("Tipo de dato:", typeof pokemon);
  });
  
  function mostrarPikacu(pokemon) {
  const nombres = pokemon.nombres
    .map(nombres => `<li>${nombres}</li>`)
    .join("");

  document.body.innerHTML = `
    <h1>Listado de nombres</h1>
    <article>
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.url}" alt="${pokemon.name}" height="300">
      <p>${pokemon.name}</p>
      <h3>Nombres</h3>
      <ul>${nombres}</ul>
    </article>
  `;
}


