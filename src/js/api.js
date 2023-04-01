export async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    return response.json();
}

export async function getPageOfPokemons(page) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
    return await response.json();
}

export async function getPokemon(ID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
    return await response.json();
}

export async function getPokemonSpecie(ID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}`);
    return await response.json();
}

export function getPokemonSprite(ID) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ID}.svg`;
}