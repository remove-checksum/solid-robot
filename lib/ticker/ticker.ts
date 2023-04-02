type TickerCallbacks = {
	update: (dt: number) => void;
	render: (dt: number) => void;
};

/**
 * Создает тикер с заданной частотой
 * @param cb
 * @param rate Частота симуляции (тиков в секунду)
 * @param maxFrameskip Максимум пропущеных кадров
 * @returns
 */

export function ticker(
	{ update, render }: TickerCallbacks,
	rate = 60,
	maxFrameskip = 10
) {
	const skipTime = 1000 / rate;
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
		if (running) {
			window.requestAnimationFrame(loop);
		}
	}

	function start() {
		running = true;
		window.requestAnimationFrame(loop);
	}

	function stop() {
		running = false;
	}

	return {
		stop,
		start,
	};
}
