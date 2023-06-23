function createPokemonTile(pokemon) {
	const $template = document.getElementById('tile-template').content.cloneNode(true);
	const { id, name, img } = pokemon;
	function onError() {
		this.onerror = null;
		this.src = img.backup;
	}
	$template.querySelector('p').textContent = name;
	$template.querySelector('img').src = img.main;
	$template.querySelector('img').alt = name;
	$template.querySelector('img').onerror = onError;
	$template.querySelector('div').dataset.id = id;

	return $template;
}

function append($pokemon) {
	const $pokemons = document.getElementById('pokemons');
	$pokemons.appendChild($pokemon);
}

export default function updatePokemons(pokemons) {
	document.getElementById('pokemons').innerHTML = '';
	const addTile = (pokemon, getImageUrl) => append(createPokemonTile({
		id: pokemon.id,
		name: pokemon.name,
		img: getImageUrl(pokemon.id),
	}));
	pokemons.names.forEach((pokemon) => addTile(pokemon, pokemons.imagesUrl));
}
