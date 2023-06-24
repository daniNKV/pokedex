import {
    parseToThreeDigits,
    convertMetersToFeetAndInches,
    convertKgToLb,
} from '../utilities/utils.js';
import {
    showPokemonInformation, appendToMain, appendTags, hidePokemons,
} from './dom.js';

function createSection() {
    return document.getElementById('pokemon-info-template').content.cloneNode(true);
}

function createItem(name, value) {
    const $itemTemplate = document.getElementById('about-item-template').content.cloneNode(true);

    $itemTemplate.querySelector('h3').textContent = name;
    $itemTemplate.querySelector('p').textContent = value;

    return $itemTemplate;
}

function createTags(names) {
    const $tagTemplate = document.getElementById('tag-template').content;
    return names.map((name) => {
        const $newTag = $tagTemplate.querySelector('li').cloneNode(true);
        $newTag.textContent = name;
        return $newTag;
    });
}

function makeHero(pokemon) {
    const {
        name, id, types, sprites,
    } = pokemon;
    const $name = document.getElementById('pokemon-name');
    const $id = document.getElementById('pokemon-id');
    const $img = document.getElementById('pokemon-image');
    const $tags = document.getElementById('tags');
    function onError() {
        this.onerror = null;
        this.src = sprites.backup;
    }
    $img.onerror = onError;
    $name.textContent = name;
    $id.textContent = `#${parseToThreeDigits(id)}`;
    $img.src = sprites.main;
    appendTags($tags, createTags(types));
}

function makeAbout(pokemon) {
    const {
        height, weight, abilities, xp,
    } = pokemon;
    const items = {
        Experience: xp,
        Height: `${height * 10} cm (${convertMetersToFeetAndInches(height / 10)})`,
        Weight: `${weight / 10} kg (${convertKgToLb(weight / 10).toFixed(2)} lb)`,
        Abilities: abilities.join(', '),
    };

    const $about = document.getElementById('basic-info');

    Object.entries(items).forEach((item) => $about.appendChild(createItem(item[0], item[1])));
}

function createGenderElement(genderProbabilities) {
    const $genders = document.getElementById('gender-template').content.cloneNode(true);
    const $venus = $genders.getElementById('venus');
    const $mars = $genders.getElementById('mars');
    if (genderProbabilities[0] > -1 && genderProbabilities[1] > -1) {
        $mars.textContent = `${genderProbabilities[0]}% `;
        $venus.textContent = `${genderProbabilities[1]}% `;
    } else {
        $mars.textContent = 'Unknown';
        $venus.textContent = 'Unknown';
    }
    return $genders;
}

function getGenderProbability(genderRate) {
    if (genderRate < 1) return [-1, -1];
    if (genderRate !== -1) {
        const femaleChance = (genderRate / 8) * 100;
        const maleChance = (femaleChance === 100) ? 0 : 100 - femaleChance;

        return [maleChance, femaleChance];
    }
    return [0, 0];
}

function makeBreeding(pokemon) {
    const {
        eggGroups, genderRate, growthRate, habitat,
    } = pokemon;

    const items = {
        Habitat: habitat,
        'Egg Groups': eggGroups.join(', '),
        'Growth Rate': growthRate,
    };
    const $breeding = document.getElementById('breeding-info');
    $breeding.appendChild(createGenderElement(getGenderProbability(genderRate)));
    Object.entries(items).forEach((item) => {
        $breeding.appendChild(createItem(item[0], (item[1])));
    });
}

function createStat(template, name, value) {
    const $stat = template.content.cloneNode(true);

    $stat.querySelector('h3').textContent = name;
    $stat.querySelector('p').textContent = value;
    $stat.querySelector('progress').value = value;

    return $stat;
}

function makeStats(stats) {
    const $statsElement = document.getElementById('stats');
    const $statItem = document.getElementById('stats-item-template');
    const $statTotalItem = document.getElementById('stats-total-template');

    const totalStats = stats.map((item) => item.value).reduce((a, b) => a + b);
    const append = (child) => $statsElement.appendChild(child);
    const createEl = ($el, name, value) => append(createStat($el, name, value));

    stats.forEach((stat) => createEl($statItem, stat.name, stat.value));
    append(createEl($statTotalItem, 'Total', totalStats));
}

function handleNavigation(e) {
    if (e.target.classList.contains('unselected')) {
        const $nav = document.getElementById('nav-info');
        const $selected = $nav.children[$nav.dataset.selected];

        document.querySelector(`[data-section="${$nav.dataset.selected}"]`).classList.add('hidden');
        document.querySelector(`[data-section="${e.target.dataset.button}"]`).classList.remove('hidden');

        $selected.classList.remove('selected');
        $selected.classList.add('unselected');

        e.target.classList.remove('unselected');
        e.target.classList.add('selected');

        $nav.dataset.selected = e.target.dataset.button;
    }
}

function showPokemon(pokemon) {
    appendToMain(createSection());
    makeHero(pokemon);
    makeAbout(pokemon);
    makeBreeding(pokemon);
    makeStats(pokemon.stats);
    showPokemonInformation();
}

export default async function initializePokemon(e, getPokemon) {
    const $card = e.target.closest('div');
    if (!$card) return;
    const ID = $card.dataset.id;
    const pokemon = await getPokemon(ID);
    hidePokemons();
    showPokemon(pokemon);

    document.getElementById('nav-info').onclick = handleNavigation;
}
