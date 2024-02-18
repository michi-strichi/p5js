import p5 from "p5";
import { mod } from "./utils";
import { DIMS, cells } from "./vars";

export const populateCells = (p: p5, clear?: boolean) => {
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			cells.active[r][c].age = clear ? 0 : 1 < p.floor(p.random(10)) ? 0 : 1;
		}
	}
};

export const eraseRadius = (p: p5, row: number, col: number, radius: number) => {
	for (let r = -radius; r <= radius; r++) {
		for (let c = -radius; c <= radius; c++) {
			const d = p.dist(row, col, row + r, col + c);
			const affected = d < radius;
			if (affected) cells.active[mod(row + r, DIMS.rows)][mod(col + c, DIMS.cols)].age = 0;
		}
	}
};


export const updateStates = () => {
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			cells.inactive[r][c].age = applyRules(r, c);
		}
	}

	[cells.active, cells.inactive] = [cells.inactive, cells.active];
};

const applyRules = (row: number, col: number) => {
	return classicRules(row, col);
};

const classicRules = (row: number, col: number) => {
	// live, < 2 --- dead
	// live, 2 || 3 --- alive
	// live , > 3 --- dead
	// dead, === 3 --- alive
	const cell = cells.active[row][col];
	const aliveNeighborsCount = countNeighbors(row, col, 1);

	if (cell.age === 0) {
		if (aliveNeighborsCount === 3) return 1;
		else return 0;
	} else {
		if (aliveNeighborsCount < 2 || 3 < aliveNeighborsCount) return 0;
		else return cell.age + 1;
	}
};

const countNeighbors = (row: number, col: number, radius: number) => {
	let aliveNeighborsCount = 0;

	for (let r = -radius; r <= radius; r++) {
		for (let c = -radius; c <= radius; c++) {
			if (r === 0 && c === 0) continue;
			const neighbor = cells.active[mod(row + r, DIMS.rows)][mod(col + c, DIMS.cols)];
			if (neighbor.age > 0) aliveNeighborsCount++;
		}
	}

	return aliveNeighborsCount;
};
