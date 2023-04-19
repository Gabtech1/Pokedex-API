const pokeApi = {}

function convertPokeApiDetail(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.mainType = type
    pokemon.types = types

    pokemon.sprite = pokeDetail.sprites.other.dream_world.front_default

    // Teste desafio
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name)
    pokemon.moves = moves

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetail)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

