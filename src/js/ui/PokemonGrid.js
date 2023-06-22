class PokemonGrid extends HTMLElement {
	constructor(callbacks) {
		super();
		const { pokemons, createCard } = callbacks;
		this.attachShadow({ mode: 'open' });
		this.pokemons = pokemons;
		this.createCard = createCard;
		const $template = document.getElementById('grid-template').content().cloneNode();
		this.shadowRoot.appendChild($template);
	}

	static get observedAttributes() {
		return ['data-visible'];
	}

	connectedCallback() {
		// document.getElementById('pokemons').innerHTML = '';
		const $list = this.shadowRoot.getElementById('pokemon-grid');
		this.pokemons.forEach((pokemon) => $list.appendChild(this.createCard(pokemon)));
	}
}
customElements.define('pokemons-grid', PokemonGrid);
