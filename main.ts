import { ticker } from "./lib";

const canvas = document.getElementById("rect") as HTMLCanvasElement;

const ctx = canvas.getContext("2d");

const update = () => {
	console.log("u");
};

const render = () => {
	console.log("r");
};

const sos = ticker({ update, render });
sos.start();

setTimeout(() => {
	sos.stop();
	console.log("stopped");
}, 3000);
