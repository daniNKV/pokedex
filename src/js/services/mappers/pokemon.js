import PokeList from '../entities/PokeList';
import Pokemon from '../entities/Pokemon';
import Stat from '../entities/Stat';

export function mapPokemon(mainEndpoint = {}, specieEndpoint = {}) {
	const {
		id,
		base_experience: xp,
		name,
		height,
		weight,
		types,
		stats,
		sprites,
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
		name,
		height,
		weight,
		types.map((item) => item.type.name),
		stats.map((item) => new Stat(item.stat.name, item.base_stat)),
		sprites,
		abilities.map((item) => item.ability.name),
		eggGroups.map((group) => group.name),
		genderRate,
		generation.name,
		growthRate.name,
		habitat.name,
		shape.name,
		color.name,
	);
}

export function mapPokemonList(api, spriteCallback) {
	const { count, results } = api;
	return new PokeList(
		count,
		results.map((pokemon) => pokemon.name),
		spriteCallback,
	);
}
