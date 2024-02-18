import p5 from "p5";
import { DIMS, cells } from "./vars";

export const renderCells = (p: p5) => {
	p.noStroke();
	for (let r = 0; r < DIMS.rows; r++) {
		for (let c = 0; c < DIMS.cols; c++) {
			const cell = cells.active[r][c];
			if (cell.age === 0) continue;
			const color = getColorForAge(p, cell.age);
			p.fill(color.r, color.g, color.b);
			p.square(c * DIMS.size, r * DIMS.size, DIMS.size);
		}
	}
};

const getColorForAge = (p: p5, age: number) => {
	if (age > 0) return { r: 100, g: 0, b: p.constrain(255 - age * 5 , 100, 255)};
	if (age < 0) return { r: 50 + age, g: 50 + age, b: 50 + age }
	return { r: 0, g: 0, b: 0 };
};

export const drawGrid = (p: p5) => {
	p.strokeWeight(1);
	p.stroke(50);
	for (let r = 0; r < DIMS.rows; r++) p.line(0, r * DIMS.size, DIMS.width, r * DIMS.size);
	for (let c = 0; c < DIMS.cols; c++) p.line(c * DIMS.size, 0, c * DIMS.size, DIMS.height);
};
