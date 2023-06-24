export default class PokemonList {
    constructor(
        total = 0,
        pokemons = [{ id: 0, name: '' }],
        imagesUrl,
    ) {
        this.total = total;
        this.names = pokemons;
        this.imagesUrl = imagesUrl;
    }
}
