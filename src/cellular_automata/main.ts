import p5 from "p5";
import { DIMS, createSubstrateMap, gameState } from "./vars";
import { drawGrid, drawCells, drawSubstrate } from "./draw";
import { populateCells, updateStates } from "./logic";
import { assignInteractions, mouseDrawCells } from "./interaction";

new p5((p: p5) => {
	p.setup = () => {
		p.createCanvas(DIMS.width, DIMS.height);
		p.frameRate(20);

		createSubstrateMap(p);
		populateCells(p, 8);
		assignInteractions(p);
	};

	p.draw = () => {
		p.background("black");
		// drawGrid(p); 
		if (!gameState.paused) updateStates();
		mouseDrawCells(p);
		drawCells(p);
		drawSubstrate(p);
	};
});