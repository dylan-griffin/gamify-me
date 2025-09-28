<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { quests, currentQuest } from '$lib/stores.js';

	let stopped = $state(false);

	function drawRotated(ctx, img, x, y, w, h, angle, pivotX = 0.5, pivotY = 0.5) {
		ctx.save();

		// Move origin to the pivot point in world space
		ctx.translate(x + w * pivotX, y + h * pivotY);

		// Rotate around that pivot
		ctx.rotate(angle);

		// Draw the image so that the pivot aligns with the origin
		ctx.drawImage(img, -w * pivotX, -h * pivotY, w, h);

		ctx.restore();
	}

	let canvas, ctx;
	let bgProgress = 0;
	let bobbingProgress = 0;
	let swingProgress = 0;

	const speed = 2; // pixels per frame

	const scale = 4; // scale factor for pixel art
	const knightXOffset = 10; // x offset to center knight
	const knightYOffset = 20; // y offset to center knight

	const swordSwingStart = 90; // degrees

	onMount(() => {
		if ($quests.length === 0) {
			goto('/');
		}

		const background = new Image();
		background.src = '/backgrounds/forest.png';
		const body = new Image();
		body.src = '/knight/body.png';
		const head = new Image();
		head.src = '/knight/head.png';
		const sword = new Image();
		sword.src = '/knight/sword.png';

		ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;

		function draw() {
			const w = canvas.width;
			const h = canvas.height;

			ctx.clearRect(0, 0, w, h);

			if (!stopped) {
				// Progress animations
				bgProgress = (bgProgress - speed / 2) % h;
				bobbingProgress = (bobbingProgress + 0.1) % (Math.PI * 2);
			} else {
				bobbingProgress = (bobbingProgress + 0.05) % (Math.PI * 2);
			}

			// Background
			ctx.drawImage(background, bgProgress, 0, h, h);
			ctx.drawImage(background, bgProgress + h, 0, h, h);
			ctx.drawImage(background, bgProgress + h * 2, 0, h, h);

			// Knight
			// Sword
			drawRotated(
				ctx,
				sword,
				9 * scale + knightXOffset + Math.sin(bobbingProgress) * speed,
				-11 * scale + knightYOffset + Math.sin(bobbingProgress) * 2 * speed,
				sword.width * scale,
				sword.height * scale,
				swordSwingStart,
				0.5,
				1
			);

			// Head
			ctx.drawImage(
				head,
				12 * scale + knightXOffset,
				10 * scale + knightYOffset + Math.sin(bobbingProgress) * speed,
				head.width * scale,
				head.height * scale
			);

			// Body
			ctx.drawImage(
				body,
				2 * scale + knightXOffset,
				17 * scale + knightYOffset + Math.sin(bobbingProgress) * 2 * speed,
				body.width * scale,
				body.height * scale
			);

			requestAnimationFrame(draw);
		}

		background.onload = () => draw();
	});
</script>

<main class="h-full w-full">
	<canvas bind:this={canvas} class="bg-base-200 h-auto w-full outline [image-rendering:pixelated]"
	></canvas>
	<div class="absolute left-0 top-[10dvh] z-10">
		<button class="btn btn-primary m-4" onclick={() => (stopped = !stopped)}>Start</button>
	</div>
</main>
