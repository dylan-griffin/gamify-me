<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { quest, bouts } from '$lib/stores.js';
	import { initializeCanvas } from '$lib/fantasy.js';
	import { toRomanNumeral } from '$lib/utils.js';

	let moving = $state(false);
	let speed = $state(1);

	let newBout = $state('');

	function endQuest() {
		quest.set(null);
		bouts.set([]);
		goto('/');
	}

	function addBout() {
		if (!newBout) return;
		bouts.update((currentBouts) => [
			...currentBouts,
			{
				name: newBout.trim(),
				xp: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
				completed: false
			} // default XP
		]);
		newBout = '';
	}

	// 🗡️ New: remove a bout by index
	function removeBout(index) {
		bouts.update((currentBouts) => currentBouts.filter((_, i) => i !== index));
	}

	let canvas;

	const scale = 4;
	const knightXOffset = 10;
	const knightYOffset = 0;
	const swordSwingStart = 20;

	onMount(() => {
		if (!$quest) {
			goto('/');
		}

		initializeCanvas(
			canvas,
			'/backgrounds/home.png',
			moving,
			speed,
			scale,
			knightXOffset,
			knightYOffset,
			swordSwingStart
		);
	});
</script>

<main class="h-full w-full">
	<canvas bind:this={canvas} class="bg-base-200 h-auto w-full [image-rendering:pixelated]"></canvas>
	<div class="absolute right-[5vh] top-0 z-10 flex h-full w-full flex-col items-end justify-center gap-8">
        <h1 class="bg-primary text-primary-content rounded-xl text-7xl 2xl:text-9xl w-1/3 p-4 text-center">Victory!</h1>
        <button class="btn btn-success h-auto p-4 w-1/3 text-4xl 2xl:text-6xl" onclick={endQuest}>New Quest</button>
	</div>
</main>
