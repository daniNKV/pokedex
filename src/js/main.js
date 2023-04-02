import { getPokemons, getPokemon, getPokemonSpecie, getPokemonSprite, getPokemonsPage } from './api.js';
import { fillPage, } from './ui/home.js';
import { initializePagination, handlePagination } from './pagination.js';
import { hidePokemons } from './dom.js';
import { showPokemon, handleNavigation } from './ui/pokemon.js';

async function initialize() {
    const pokemons = await getPokemons();

    fillPage(pokemons, getPokemonSprite);
    initializePagination(Math.ceil(pokemons.count / 20));
}

async function initializePokemon(e) {
    const ID = e.target.dataset.id;
    const pokemonBasic = await getPokemon(ID);
    const pokemonSpecie = await getPokemonSpecie(ID);

    hidePokemons();
    showPokemon(pokemonBasic, pokemonSpecie);

    document.getElementById('nav-info').onclick = handleNavigation    
}

document.addEventListener('load', initialize());
document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e, { getPokemonsPage, getPokemonSprite, fillPage }));
document.getElementById('pokemons').addEventListener('click', (e) => initializePokemon(e));
