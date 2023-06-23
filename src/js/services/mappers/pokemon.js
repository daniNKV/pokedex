import PokeList from '../entities/PokemonList.js';
import Pokemon from '../entities/Pokemon.js';
import Stat from '../entities/Stat.js';
import { capitalizeFirstLetter, getId } from '../../utilities/utils.js';

export function mapPokemon(mainEndpoint = {}, specieEndpoint = {}, sprites) {
	const {
		id,
		base_experience: xp,
		name,
		height,
		weight,
		types,
		stats,
		abilities,
	} = mainEndpoint;

	const {
		egg_groups: eggGroups,
		gender_rate: genderRate,
		generation,
		growth_rate: growthRate,
		habitat,
		shape,
		color,
	} = specieEndpoint;

	return new Pokemon(
		id,
		xp,
		capitalizeFirstLetter(name),
		height,
		weight,
		types.map((item) => item.type.name),
		stats.map((item) => new Stat(item.stat.name, item.base_stat)),
		abilities.map((item) => capitalizeFirstLetter(item.ability.name)),
		eggGroups.map((group) => capitalizeFirstLetter(group.name)),
		genderRate,
		capitalizeFirstLetter(generation.name),
		capitalizeFirstLetter(growthRate.name),
		capitalizeFirstLetter(habitat.name),
		capitalizeFirstLetter(shape.name),
		capitalizeFirstLetter(color.name),
		sprites,
	);
}

export function mapPokemonList(api, getSprite) {
	const { count, results } = api;

	return new PokeList(
		count,
		results.map((pokemon) => {
			const { name, url } = pokemon;
			return {
				id: getId(url),
				name: capitalizeFirstLetter(name),
			};
		}),
		getSprite,
	);
}
