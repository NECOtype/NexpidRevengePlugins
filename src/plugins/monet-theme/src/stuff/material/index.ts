// https://github.com/material-foundation/material-color-utilities/blob/ca894db8b6aebb2833f1805ae61573c92e3f1660/typescript/utils/color_utils.ts#L80-L99
/**
 * Returns the red component of a color in ARGB format.
 */
export function redFromArgb(argb: number): number {
	return (argb >> 16) & 255;
}

/**
 * Returns the green component of a color in ARGB format.
 */
export function greenFromArgb(argb: number): number {
	return (argb >> 8) & 255;
}

/**
 * Returns the blue component of a color in ARGB format.
 */
export function blueFromArgb(argb: number): number {
	return argb & 255;
}
// ---

// https://github.com/material-foundation/material-color-utilities/blob/ca894db8b6aebb2833f1805ae61573c92e3f1660/typescript/utils/string_utils.ts#L24-L83
/**
 * @param argb ARGB representation of a color.
 * @return Hex string representing color, ex. #ff0000 for red.
 */
export function hexFromArgb(argb: number) {
	const r = redFromArgb(argb);
	const g = greenFromArgb(argb);
	const b = blueFromArgb(argb);
	const outParts = [r.toString(16), g.toString(16), b.toString(16)];

	// Pad single-digit output values
	for (const [i, part] of outParts.entries()) {
		if (part.length === 1) {
			outParts[i] = `0${part}`;
		}
	}

	return `#${outParts.join("")}`;
}

/**
 * @param hex String representing color as hex code. Accepts strings with or
 *     without leading #, and string representing the color using 3, 6, or 8
 *     hex characters.
 * @return ARGB representation of color.
 */
export function argbFromHex(hex: string) {
	hex = hex.replace("#", "");
	const isThree = hex.length === 3;
	const isSix = hex.length === 6;
	const isEight = hex.length === 8;
	if (!isThree && !isSix && !isEight) {
		throw new Error(`unexpected hex ${hex}`);
	}
	let r = 0;
	let g = 0;
	let b = 0;
	if (isThree) {
		r = parseIntHex(hex.slice(0, 1).repeat(2));
		g = parseIntHex(hex.slice(1, 2).repeat(2));
		b = parseIntHex(hex.slice(2, 3).repeat(2));
	} else if (isSix) {
		r = parseIntHex(hex.slice(0, 2));
		g = parseIntHex(hex.slice(2, 4));
		b = parseIntHex(hex.slice(4, 6));
	} else if (isEight) {
		r = parseIntHex(hex.slice(2, 4));
		g = parseIntHex(hex.slice(4, 6));
		b = parseIntHex(hex.slice(6, 8));
	}

	return (
		((255 << 24)
			| ((r & 0x0ff) << 16)
			| ((g & 0x0ff) << 8)
			| (b & 0x0ff))
		>>> 0
	);
}

function parseIntHex(value: string) {
	// tslint:disable-next-line:ban
	return Number.parseInt(value, 16);
}
// ---
