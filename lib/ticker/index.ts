type TickerCallbacks = {
	update: (dt: number) => void;
	render: (dt: number) => void;
};

export function ticker(
	{ update, render }: TickerCallbacks,
	rate = 60,
	maxFrameskip = 10
) {
	const skipTime = 1000 / rate;
	let rafHandle = 0;
	let running = false;

	let loops = 0;
	let time = performance.now();
	let lastTime = 0;

	function loop() {
		loops = 0;
		while (performance.now() > time && loops < maxFrameskip) {
			update(time - lastTime);

			time += skipTime;
			loops += 1;
		}

		render(time);
		rafHandle = window.requestAnimationFrame(loop);
	}

	function start() {
		let running = true;
		rafHandle = window.requestAnimationFrame(loop);
	}

	function stop() {
		running = false;
		window.cancelAnimationFrame(rafHandle);
	}

	return {
		stop,
		start,
	};
}
