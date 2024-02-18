import p5 from "p5";
import { DIMS, Substrate, cells, substrateMap } from "./vars";

export const drawCells = (p: p5) => {
	p.noStroke();
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			const cell = cells.active[r][c];
			if (cell.age === 0) continue;
			setColorForAge(p, cell.age);
			p.square(c * DIMS.size, r * DIMS.size, DIMS.size);
		}
	}
};

const setColorForAge = (p: p5, age: number) => {
	if (age > 0) p.fill(0, p.constrain(200 - age * 5, 110, 255), 30);
	if (age < 0) p.fill(0, 50, 10, 70 + age);
};

export const drawSubstrate = (p: p5) => {
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			setColorForSubstrate(p, substrateMap[r][c])
			p.square(c * DIMS.size, r * DIMS.size, DIMS.size);
		}
	}
}

const setColorForSubstrate = (p: p5, substrate: Substrate) => {
	switch (substrate) {
		case 0: p.fill(99, 78, 53); break;
		case 1: p.fill(54, 40, 22)
	}
}

export const drawGrid = (p: p5) => {
	p.strokeWeight(1);
	p.stroke(50);
	for (let r = 0; r < DIMS.rows; r++) p.line(0, r * DIMS.size, DIMS.width, r * DIMS.size);
	for (let c = 0; c < DIMS.cols; c++) p.line(c * DIMS.size, 0, c * DIMS.size, DIMS.height);
};
