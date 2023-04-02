export function capitalizeFirstLetter(string) {
	return string[0].toUpperCase().concat(string.slice(1));
}

export function getId(url) {
	const numbersRegex = /\d/g;
	return url.match(numbersRegex).slice(1).join('');
}

function parseFromHyphen(string) {
	return capitalizeFirstLetter(string.replaceAll('-', ' '));
}

export function objectPropsToString(obj, prop) {
	return obj.map((innerObj) => {
		const value = prop === 'name' ? innerObj.name : innerObj.ability.name;
		return parseFromHyphen(value);
	}).join(', ');
}

export function convertMetersToFeetAndInches(meters) {
	const totalInches = meters * 39.3701;
	const feet = Math.floor(totalInches / 12);
	const inches = Math.round(totalInches % 12);
	return `${feet}'${inches}"`;
}

export function convertKgToLb(kg) {
	const lb = kg * 2.20462;
	return lb;
}

export function parseToThreeDigits(number) {
	if (number < 10) {
		return `00${number.toString()}`;
	} if (number < 100) {
		return `0${number.toString()}`;
	} return number.toString();
}

export function parseFromSnake(string) {
	return capitalizeFirstLetter(string.replaceAll('_', ' '));
}

export function checkError(value) {
	if (Number.isInteger(value) && (value > 0 && value <= 65)) {
		return true;
	}

	return false;
}
