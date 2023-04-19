const pokemonList = document.getElementById('pokemonlist');
const backList = document.getElementById('backList');
const loadBtn = document.getElementById('load');
const limit = 16
let offset = 0

function convertPokemonToHtml(pokemon) {
    return `
            <li class="pokemon-item ${pokemon.mainType}">
            <p class="pokemon">${pokemon.name} <span>#${pokemon.number}</span></p>
            <div class="pokemon-info">
                <ol class="pokemon-type">
                    ${pokemon.types.map((type) => `<li class="type ${pokemon.mainType}">${type}</li>`).join(' ')}
                </ol>

                <img class="pokemon-sprite" src="${pokemon.sprite}" alt="${pokemon.name}">
            </div>
            </li>
    `
}


function convertPokemonCardDesafio(pokemon) {
    return `
            <li class="poke-back ${pokemon.mainType}">
            <p class="pokemon">${pokemon.name} <span>#${pokemon.number}</span></p>
            <div class="back-info">
                <ol class="pokemon-stats">
                    <li class="stats">Height: ${pokemon.height}.</li>
                    <li class="stats">Weight: ${pokemon.weight}.</li>
                    <li class="ability">Ability: ${pokemon.abilities[0]}</li>
                </ol>

                <ol class="pokemon-moves">Moves:
                    <li class="moves">1. ${pokemon.moves[0]}</li>
                    <li class="moves">2. ${pokemon.moves[1]}</li>
                    <li class="moves">3. ${pokemon.moves[2]}</li>
                </ol>
            </div>
            </li>
    `
}

function loadDesafio (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const desafioHtml = pokemons.map(convertPokemonCardDesafio).join('');
        backList.innerHTML += desafioHtml;
    })
}

function loadPokemonList (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonList(offset, limit)
loadDesafio(offset, limit)

loadBtn.addEventListener('click', () => {
    offset += limit
    loadPokemonList(offset, limit)
    loadDesafio(offset, limit)
})

