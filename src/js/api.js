export async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    return await response.json();
}

export async function getPokemonsPage(page) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
    return await response.json();
}

export async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await response.json();
}

export async function getPokemonSpecie(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return await response.json();
}

export function getPokemonSprite(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}