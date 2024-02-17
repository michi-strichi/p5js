import p5 from "p5";

const ROWS = 130;
const COLS = 130;
const SIZE = 6;
const WIDTH = COLS * SIZE;
const HEIGHT = ROWS * SIZE;
let paused = false;

let activeCells: Array<Array<number>> = [];
let inactiveCells: Array<Array<number>> = [];

new p5((p: p5) => {
	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT);
		p.frameRate(20);

		initCells();
		populateCells();
	};

	p.draw = () => {
		p.background(20);
		// drawGrid();

		if (!paused) updateStates();
		mouseDrawCells();
		renderCells();
	};


	p.keyPressed = () => {
		switch (p.key) {
			case " ":
				paused = !paused;
				break;
			case "c": // clear ;
				populateCells(true);
				break;
			case "p":
				populateCells();
				break;
			case "e":
				eraseRadius(p.floor(p.mouseY / SIZE), p.floor(p.mouseX / SIZE), 10);
				break;
		}
	}

	const mouseDrawCells = () => {
		if (!p.mouseIsPressed) return;
		const row = p.floor(p.mouseY / SIZE);
		const col = p.floor(p.mouseX / SIZE);
		activeCells[row][col] = 1;
	};

	const initCells = () => {
		for (let r = 0; r < ROWS; r++) {
			activeCells[r] = new Array(COLS).fill(0);
			inactiveCells[r] = new Array(COLS).fill(0);
		}
	};

	const populateCells = (clear?: boolean) => {
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				activeCells[r][c] = clear ? 0 : 1 < p.floor(p.random(100)) ? 0 : 1;
			}
		}
	};

	const eraseRadius = (row:number, col:number, radius:number) => {
		for (let r = -radius; r <= radius; r++) {
			for (let c = -radius; c <= radius; c++) {
				const d = p.dist(row, col, row + r, col + c);
				const affected = d < radius;
				if (affected) activeCells[mod(row + r, ROWS)][mod(col + c, COLS)] = 0;
			}
		}
	};

	const updateStates = () => {
		for (let r = 0; r < ROWS; r++) {
		  for (let c = 0; c < COLS; c++) {
			inactiveCells[r][c] = applyRules(r, c);
		  }
		}
	  
		[activeCells, inactiveCells] = [inactiveCells, activeCells];
	  };
	  
	  const applyRules = (row:number, col:number) => {
		const ownState = activeCells[row][col];
		return classicRules(row, col, ownState);
	  };
	  
	  const classicRules = (row:number, col:number, ownState:number) => {
		// live, < 2 --- dead
		// live, 2 || 3 --- alive
		// live , > 3 --- dead
		// dead, === 3 --- alive
	  
		const aliveNeighborsCount = countNeighbors(row, col, 2);
	  
		if (ownState === 0) {
		  if (aliveNeighborsCount === 3) return 1;
		  else return 0;
		} else {
		  if (aliveNeighborsCount < 10 || 19 < aliveNeighborsCount) return 0;
		  else return ownState + 1;
		}
	  };
	  
	  const countNeighbors = (row:number, col:number, radius:number) => {
		let aliveNeighborsCount = 0;
	  
		for (let r = -radius; r <= radius; r++) {
		  for (let c = -radius; c <= radius; c++) {
			if (r === 0 && c === 0) continue;
			const neighbor = activeCells[mod(row + r, ROWS)][mod(col + c, COLS)];
			if (neighbor > 0) aliveNeighborsCount++;
		  }
		}
	  
		return aliveNeighborsCount;
	  };
	  
	  // --------- RENDER
	  
	  const renderCells = () => {
		p.noStroke();
		for (let r = 0; r < ROWS; r++) {
		  for (let c = 0; c < COLS; c++) {
			const state = activeCells[r][c];
			if (state === 0) continue;
			p.fill(100, 0, p.max(50, 200 - getColorForState(state)));
			p.square(c * SIZE, r * SIZE, SIZE);
		  }
		}
	  };
	  
	  const getColorForState = (state: number) => {
		return state * 5;
	  };
	  
	  const drawGrid = () => {
		p.strokeWeight(1);
		p.stroke(40);
		for (let r = 0; r < ROWS; r++) p.line(0, r * SIZE, WIDTH, r * SIZE);
		for (let c = 0; c < COLS; c++) p.line(c * SIZE, 0, c * SIZE, HEIGHT);
	  };
	  
	  // ------ UTILS
	const mod = (n: number, m: number) => ((n % m) + m) % m;

});