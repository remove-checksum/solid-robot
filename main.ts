import { ticker } from "./lib";

const CWIDTH = 800;
const CHEIGHT = 600;

const canvas = document.getElementById("rect") as HTMLCanvasElement;
canvas.style.backgroundColor = "gray";
canvas.width = CWIDTH;
canvas.height = CHEIGHT;

const ctx = canvas.getContext("2d");

const keymap = {
	ArrowLeft: false,
	ArrowRight: false,
	ArrowDown: false,
	ArrowUp: false,
};

window.addEventListener("keydown", ({ code }) => {
	if (code in keymap) {
		keymap[code] = true;
	}
});

window.addEventListener("keyup", ({ code }) => {
	if (code in keymap) {
		keymap[code] = false;
	}
});

let rect = {
	velocity: {
		x: 0,
		y: 0,
	},
	x: 20,
	y: 20,
	size: 40,
	fill: "#3f3dd1",
};

if (!ctx) throw new Error("no context?");

const update = (dt) => {
	if (keymap.ArrowLeft) {
		rect.velocity.x += -5;
	}

	if (keymap.ArrowRight) {
		rect.velocity.x += 5;
	}

	if (keymap.ArrowUp) {
		rect.velocity.y += -5;
	}

	if (keymap.ArrowDown) {
		rect.velocity.y += 5;
	}

	if (Object.values(keymap).every((x) => !x)) {
		console.log("no press");
		rect.velocity.x *= 0.8;
		rect.velocity.y *= 0.8;
	}

	rect.x += rect.velocity.x * 0.1;
	rect.y += rect.velocity.y * 0.1;
};

const render = () => {
	ctx.clearRect(0, 0, CWIDTH, CHEIGHT);

	ctx.fillStyle = rect.fill;
	ctx.fillRect(rect.x, rect.y, rect.size, rect.size);
};

const tc = ticker({ update, render });
tc.start();

window.addEventListener("keydown", ({ code }) => {
	if (code === "Space") tc.stop();
});
