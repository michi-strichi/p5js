import p5 from "p5";
import { mod } from "./utils";
import { Cell, DIMS, Substrate, cells, substrateMap } from "./vars";

export const populateCells = (p: p5, chance: number) => {
	clearAllCells();
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			const createCell = p.floor(p.random(chance)) === 0;
			if (createCell) cells.active[r][c].age = 1;
		}
	}
};

export const clearAllCells = () => {
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			cells.active[r][c].age = 0;
		}
	}
}

export const killRadius = (p: p5, row: number, col: number, radius: number) => {
	for (let r = -radius; r <= radius; r++) {
		for (let c = -radius; c <= radius; c++) {
			const d = p.dist(row, col, row + r, col + c);
			const affected = d < radius;
			if (!affected) continue;
			const cell = cells.active[mod(row + r, DIMS.rows)][mod(col + c, DIMS.cols)];
			if (cell.age > 0) cell.age = -1;
		}
	}
};


export const updateStates = () => {
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			const rulesFunc = substrateRules[substrateMap[r][c]];
			cells.inactive[r][c].age = rulesFunc(r, c);
		}
	}

	[cells.active, cells.inactive] = [cells.inactive, cells.active];
};

type RulesFunc = (r: number, c: number) => number;

const classicRules: RulesFunc = (row: number, col: number) => {
	// live, < 2 --- dead
	// live, 2 || 3 --- alive
	// live , > 3 --- dead
	// dead, === 3 --- alive
	const cell = cells.active[row][col];
	const { aliveNeighborsCount, deadNeighborsCount } = countNeighbors(row, col, 1);

	if (cell.age <= 0) {
		if (aliveNeighborsCount === 3) return 1;
		else if (cell.age === 0) return 0
		else return cell.age - 1;
	} else {
		if (aliveNeighborsCount < 2 || 3 < aliveNeighborsCount) return -1;
		else return cell.age + 1;
	}
};

const overpopulationRules: RulesFunc = (row: number, col: number) => {
	const cell = cells.active[row][col];
	const { aliveNeighborsCount, deadNeighborsCount } = countNeighbors(row, col, 1);

	if (cell.age <= 0) {
		if (aliveNeighborsCount === 3) return 1;
		else if (cell.age === 0) return 0
		else return cell.age - 1;
	} else {
		if (aliveNeighborsCount < 2 || 4 < aliveNeighborsCount) return -1;
		else return cell.age + 1;
	}
}

const substrateRules: { [K in Substrate]: RulesFunc } = {
	0: classicRules,
	1: overpopulationRules
}

const countNeighbors = (row: number, col: number, radius: number) => {
	let aliveNeighborsCount = 0;
	let deadNeighborsCount = 0;

	for (let r = -radius; r <= radius; r++) {
		for (let c = -radius; c <= radius; c++) {
			if (r === 0 && c === 0) continue;
			const neighbor = cells.active[mod(row + r, DIMS.rows)][mod(col + c, DIMS.cols)];
			if (neighbor.age === 0) continue;
			if (neighbor.age > 0) aliveNeighborsCount++;
			if (neighbor.age < 0) deadNeighborsCount++;
		}
	}

	return { aliveNeighborsCount, deadNeighborsCount };
};
