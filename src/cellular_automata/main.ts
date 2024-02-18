import p5 from "p5";
import { drawGrid, renderCells } from "./draw";

import { DIMS, gameState } from "./vars";
import { populateCells, updateStates } from "./logic";
import { assignInteractions, mouseDrawCells } from "./interaction";

new p5((p: p5) => {
	p.setup = () => {
		p.createCanvas(DIMS.width, DIMS.height);
		p.frameRate(20);

		populateCells(p, 8);
		assignInteractions(p);
	};

	p.draw = () => {
		p.background("black");
		// drawGrid(p);

		if (!gameState.paused) updateStates();
		mouseDrawCells(p);
		renderCells(p);
	};
});