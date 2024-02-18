
import p5 from "p5";
import { eraseRadius, populateCells } from "./logic";
import { gameState, DIMS, cells } from "./vars";

export const assignInteractions = (p: p5) => {
	p.keyPressed = () => {
		switch (p.key) {
			case " ":
				gameState.paused = !gameState.paused;
				break;
			case "c": // clear ;
				populateCells(p, true);
				break;
			case "p":
				populateCells(p);
				break;
			case "e":
				eraseRadius(p, p.floor(p.mouseY / DIMS.size), p.floor(p.mouseX / DIMS.size), 10);
				break;
		}
	}
}

export const mouseDrawCells = (p: p5) => {
	if (!p.mouseIsPressed) return;
	const row = p.floor(p.mouseY / DIMS.size);
	const col = p.floor(p.mouseX / DIMS.size);
	const insideCanvas = (0 <= row && row <= DIMS.rows - 1) && (0 <= col && col <= DIMS.cols - 1)
	if (insideCanvas) cells.active[row][col].age = 1;
};