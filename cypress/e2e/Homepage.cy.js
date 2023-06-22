// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />
describe('Homepage', () => {
	let fetchPolyfill;
	beforeEach(() => {
		const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

		cy.request(polyfillUrl)
			.then((response) => {
				fetchPolyfill = response.body;
			});

		cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', { fixture: 'first-page.json' }).as('getFirstPage');

		cy.visit('http://127.0.0.1:5500/src/index.html', {
			onBeforeLoad(contentWindow) {
				// eslint-disable-next-line no-param-reassign
				delete contentWindow.fetch;
				contentWindow.eval(fetchPolyfill);
				// eslint-disable-next-line no-param-reassign
				contentWindow.fetch = contentWindow.unfetch;
			},
		});
	});

	it('Displays the logo', () => {
		cy.getByData('logo').should('be.visible');
	});

	describe('Shows pokemons', () => {
		it('Loads the first 20 pokemons', () => {
			const POKEMONS_COUNT = 20;
			cy.getByData('pokemons').children().should('have.length', POKEMONS_COUNT);
		});

		it('Displays name and image for each pokemon', () => {
			cy.getByData('pokemon').each(($pokemon) => {
				cy.wrap($pokemon).children('p').should('be.visible');
				cy.wrap($pokemon).children('img').should('be.visible');
			});
		});
	});

	describe('Pagination visibility', () => {
		beforeEach(() => {
			cy.getByData('pagination').as('pagination');
		});
		it('Pagination should be visible', () => {
			cy.get('@pagination')
				.should('be.visible');
		});
		it('Should display the number of pages available', () => {
			const TOTAL_PAGES = 64;
			cy.get('@pagination').children().get('#total-pages')
				.should('have.text', TOTAL_PAGES);
		});
		it('Should display the navigation form', () => {
			const CURRENT_PAGE = 1;
			cy.get('@pagination').children().getByData('navigation-form')
				.as('navigation-form');
			cy.get('@navigation-form').children().get('#page-selection')
				.should('have.value', CURRENT_PAGE);
			cy.get('@navigation-form').children().get('p').should('contain', 'Page');
			cy.get('@navigation-form').children().get('p').should('contain', 'of');
			cy.get('@navigation-form').children().get('#seek-button').should('have.text', 'GO!');
		});
		it('Should not display the previous button', () => {
			cy.get('@pagination').children().get('#previous-button')
				.should('not.be.visible');
		});
		it('Should display the next button', () => {
			cy.get('@pagination').children().get('#next-button')
				.should('be.visible');
		});
	});
});
