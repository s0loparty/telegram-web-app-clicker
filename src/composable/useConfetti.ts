import confetti from 'canvas-confetti';

const useConfetti = () => {
	const bananasEffect = () => {
		const scalar = 2;
		const banana = confetti.shapeFromText({ text: '🍌', scalar });

		const defaults = {
			spread: 360,
			ticks: 100,
			gravity: 0,
			decay: 0.93,
			startVelocity: 20,
			shapes: [banana],
			scalar,
		};

		confetti({
			...defaults,
			particleCount: 60,
		});

		confetti({
			...defaults,
			particleCount: 50,
		});

		confetti({
			...defaults,
			particleCount: 40,
			scalar: scalar / 2,
			shapes: ['circle'],
		});
	};

	return { confetti, bananasEffect };
};

export default useConfetti;
