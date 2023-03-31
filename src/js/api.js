export async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemons = await response.json();

    return pokemons;
}

export async function getPageOfPokemons(page) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
    const pokemons = await response.json();

    return pokemons;
}

export async function getPokemon(ID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
    const pokemon = await response.json();

    return pokemon;
}

export async function getPokemonSpecie(ID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}`);
    const pokemon = await response.json();

    return pokemon;
}

export function getPokemonSprite(ID) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ID}.svg`;
}