export default class PokemonList {
	constructor(
		total = 0,
		names = [],
		imagesUrl,
	) {
		this.total = total;
		this.names = names;
		this.imagesUrl = imagesUrl;
	}
}
