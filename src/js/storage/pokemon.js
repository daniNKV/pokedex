
function getPokemonsId(page, limit) {
    return `pokemons-${page}-${limit}`;
}

function getPokemonId(id) {
    return `pokemon-${id}`;
}

export function getPokemons(page, limit) {
    const pokemons = JSON.parse(localStorage.getItem(getPokemonsId(page, limit)));

    if (pokemons === null) {
        throw new Error(`Pokemons page ${page} with limit ${limit} not found`);
    }
}

export function savePokemons(page, limit, pokemons) {
    if (page === undefined || limit === undefined || typeof(pokemons) !== 'object') {
        throw new Error('No page or pokemons provided');
    }

    localStorage.setItem(getPokemonsId(page, limit), JSON.stringify(pokemons));
}

export function getPokemon(id) {
    if (id === undefined) {
        throw new Error('No id provided');
    }

    const pokemon = JSON.parse(localStorage.getItem(getPokemonId(id)));

    if (pokemon === null) {
        throw new Error(`Pokemon with id ${id} not found`);
    }

    return pokemon;
}

export function savePokemon(id, pokemon) {
    if (id === undefined || typeof(pokemon) !== 'object') {
        throw new Error('No id or pokemon provided');
    }

    localStorage.setItem(getPokemonId(id), JSON.stringify(pokemon));
}