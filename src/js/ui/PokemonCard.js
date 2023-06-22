export default class PokemonCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		const $template = document.getElementById('tile-template').content().cloneNode();
		this.shadowRoot.appendChild($template);
	}
}
