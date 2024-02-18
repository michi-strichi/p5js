import p5 from "p5";
import { DIMS, cells } from "./vars";

export const renderCells = (p: p5) => {
	p.noStroke();
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			const cell = cells.active[r][c];
			if (cell.age === 0) continue;
			p.fill(100, 0, p.max(50, 200 - getColorForState(cell.age)));
			p.square(c * DIMS.size, r * DIMS.size, DIMS.size);
		}
	}
};

const getColorForState = (state: number) => {
	return state * 5;
};

export const drawGrid = (p: p5) => {
	p.strokeWeight(1);
	p.stroke(50);
	for (let r = 0; r < DIMS.rows; r++) p.line(0, r * DIMS.size, DIMS.width, r * DIMS.size);
	for (let c = 0; c < DIMS.cols; c++) p.line(c * DIMS.size, 0, c * DIMS.size, DIMS.height);
};
