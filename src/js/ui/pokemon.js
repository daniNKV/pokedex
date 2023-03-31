import { 
    capitalizeFirstLetter, 
    parseToThreeDigits, 
    convertMetersToFeetAndInches, 
    convertKgToLb, 
    objectPropsToString,
    parseFromSnake 
} from '../utils.js';
import { showPokemonUI, appendToMain, appendTags } from '../dom.js';

export function handleNavigation(e) {
    if (e.target.classList.contains('unselected')) {
        const $nav = document.getElementById('nav-info');
        const $selected = $nav.children[$nav.dataset.selected];
        
        document.querySelector(`[data-section="${$nav.dataset.selected}"]`).classList.add('hidden')
        document.querySelector(`[data-section="${e.target.dataset.button}"]`).classList.remove('hidden')

        $selected.classList.remove('selected');
        $selected.classList.add('unselected');

        e.target.classList.remove('unselected');
        e.target.classList.add('selected')
    
        $nav.dataset.selected = e.target.dataset.button;
    }
}

export function showPokemonInfo(ID, basic, breeding) {
    // const color = breeding.color.name;
    appendToMain(createSection());

    makeHero(basic);
    makeAbout(basic);
    makeBreeding(breeding);
    makeStats(basic.stats);
    showPokemonUI();
}

function makeBreeding(data) {
    const { egg_groups, gender_rate, growth_rate, habitat } = data;
    const items = { 
        Habitat: habitat.name, 
        ["Egg Groups"]: objectPropsToString(egg_groups, "name"),
        ["Growth Rate"]: growth_rate.name
    }
    
    const $breeding = document.getElementById('breeding-info');
    $breeding.appendChild(createGenderElement(getGenderProbability(gender_rate)));

    Object.entries(items).forEach(item => $breeding.appendChild(createItem(item[0], capitalizeFirstLetter(item[1]))));
}

function createGenderElement(values) {
    const $genders = document.getElementById('gender-template').content.cloneNode(true);

    $genders.getElementById('mars').textContent = values[0] + "% ";
    $genders.getElementById('venus').textContent = values[1] + "% ";

    return $genders;
}

function makeAbout(data) {
    const { height, weight, abilities, base_experience } = data;
    const items = { 
        Experience: base_experience, 
        Height: height*10 + " cm (" + convertMetersToFeetAndInches(height/10) + ")", 
        Weight: weight/10 + " kg (" + convertKgToLb(weight/10).toFixed(2) + " lb)", 
        Abilities: objectPropsToString(abilities, "ability") };

    const $about = document.getElementById('basic-info');

    Object.entries(items).forEach(item => $about.appendChild(createItem(item[0], item[1])));
}

function createSection() {
    const $section = document.getElementById('pokemon-info-template').content.cloneNode(true);

    return $section;
}

function createItem(name, value) {
    const $itemTemplate = document.getElementById('about-item-template').content.cloneNode(true);

    $itemTemplate.querySelector('h3').textContent = capitalizeFirstLetter(name);
    $itemTemplate.querySelector('p').textContent = value;

    return $itemTemplate;
}

function makeHero(data) {
    const {name, id, sprites, types} = data;
    const $name = document.getElementById('pokemon-name');
    const $id = document.getElementById('pokemon-id');
    const $img = document.getElementById('pokemon-image');
    const $tags = document.getElementById('tags');

    $name.textContent = capitalizeFirstLetter(name);
    $id.textContent = "#" + parseToThreeDigits(id);
    $img.src = sprites.other.dream_world.front_default;
    appendTags($tags, createTags(getTagsNames(types)));

}

function createTags(names) {
    const $tagTemplate = document.getElementById('tag-template').content;

    return Array.from(names, (name) => {
        const $newTag = $tagTemplate.querySelector('li').cloneNode(true);
        $newTag.textContent = capitalizeFirstLetter(name);

        return $newTag
    })
}

function getTagsNames(data) {
    const tags = Array.from(data, tag => tag.type.name );

    return tags;
}

function makeStats(data) {
    const $statsList = document.getElementById('stats-list');
    const $statItem = document.getElementById('stats-item-template');
    const $statTotalItem = document.getElementById('stats-total-template');

    data.forEach(item => $statsList.appendChild(createStat($statItem, item.stat.name, item.base_stat)));

    $statsList.appendChild(createStat($statTotalItem, "Total", data.map(item => item.base_stat).reduce((a, b) => a + b)))
}

function createStat(template, name, value) {
    const $stat = template.content.cloneNode(true);

    $stat.querySelector('h3').textContent = capitalizeFirstLetter(parseFromSnake(name));
    $stat.querySelector('p').textContent = value;
    $stat.querySelector('progress').value = value;

    return $stat;

}

function getGenderProbability(genderRate) {
    if (genderRate === -1) {
      return [0, 0];
    } else if (genderRate === 0) {
      return [0, 0];
    } else if (genderRate === 1) {
      return [100, 0];
    } else if (genderRate === 2) {
      return [50, 50];
    } else if (genderRate >= 3 && genderRate <= 7) {
      const femaleChance = 100 / (genderRate * 2);
      return [100 - femaleChance, femaleChance];
    } else if (genderRate === 8) {
      return [0, 100];
    }
  }


