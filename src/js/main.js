import { getPokemons, getPokemon, getPokemonSpecie, getPokemonSprite, getPokemonsPage } from './api.js';
import { fillPage, } from './ui/home.js';
import { initializePagination, handlePagination } from './pagination.js';
import { hideList } from './dom.js';
import { showPokemonInfo, handleNavigation } from './ui/pokemon.js';

async function initialize() {
    const pokemons = await getPokemons();
    fillPage(pokemons, getPokemonSprite);
    initializePagination(Math.ceil(pokemons.count / 20));
}

async function initializePokemon(e) {
    const ID = e.target.dataset.id;
    const pokemonBasic = await getPokemon(ID);
    const pokemonSpecie = await getPokemonSpecie(ID);

    hideList();
    showPokemonInfo(ID, pokemonBasic, pokemonSpecie);
    document.getElementById('nav-info').onclick = handleNavigation    
}

document.addEventListener('load', initialize());
document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e, { getPokemonsPage, getPokemonSprite, fillPage }));
document.getElementById('pokemons-list').addEventListener('click', (e) => initializePokemon(e));
