import p5 from "p5";

const SIZE = 15;
const ROWS = Math.floor(window.innerHeight / SIZE);
const COLS = Math.floor(window.innerWidth / SIZE);
const WIDTH = COLS * SIZE;
const HEIGHT = ROWS * SIZE;

export const DIMS = {
	size: SIZE,
	rows: ROWS,
	cols: COLS,
	width: WIDTH,
	height: HEIGHT
}

export type Cell = {
	age: number; // -1: just died, 1: just became alive, 5: alive for 5 gens, -5: dead for 5 gens, 0: no cell
	species: "A" | "B"
}

export const cells = {
	active: new Array(DIMS.rows) as Array<Array<Cell>>,
	inactive: new Array(DIMS.rows) as Array<Array<Cell>>
}
for (let r = 0; r < DIMS.rows; r++) {
	cells.active[r] = new Array<Cell>(DIMS.cols);
	cells.inactive[r] = new Array<Cell>(DIMS.cols);
	for (let c = 0; c < DIMS.cols; c++) {
		cells.active[r][c] = { age: 0, species: "A" };
		cells.inactive[r][c] = { age: 0, species: "A" };
	}
}

export const gameState = {
	paused: false
}

export type Substrate = 0 | 1
export const substrateMap = new Array(DIMS.rows) as Array<Array<Substrate>>;

export const createSubstrateMap = (p: p5) => {
	const noiseScale = 0.03;
	for (let r = 0; r < DIMS.rows; r++) {
		substrateMap[r] = new Array<Substrate>(COLS);
		for (let c = 0; c < DIMS.cols; c++) {
			substrateMap[r][c] = p.floor(p.noise(r * noiseScale, c * noiseScale) * 2) as 0 | 1;
		}
	}
}