<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { quest, bouts, totalXP } from '$lib/stores.js';
	import { initializeCanvas } from '$lib/fantasy.js';

	let xp = $totalXP;

	let currentBoutIndex = $state(0);
	const bountsList = $bouts;

	function resetCurrentBouts() {
		for (let i = 0; i < $bouts.length; i++) {
			if (!$bouts[i].completed) {
				currentBoutIndex = i;
				return;
			}
		}
		goto('/victory');
	}

	let moving = $state(true);
	let speed = $state(2);

	function endQuest() {
		quest.set(null);
		bouts.set([]);
		goto('/');
	}
	let canvas;

	const scale = 4; // scale factor for pixel art
	const knightXOffset = 10; // x offset to center knight
	const knightYOffset = 20; // y offset to center knight

	const swordSwingStart = 130; // degrees

	onMount(() => {
		if (!$quest) {
			goto('/');
		}
		initializeCanvas(
			canvas,
			'/backgrounds/forest.png',
			moving,
			speed,
			scale,
			knightXOffset,
			knightYOffset,
			swordSwingStart
		);
		resetCurrentBouts();
	});
</script>

<main class="h-full w-full">
	<canvas bind:this={canvas} class="h-auto w-full bg-base-200 [image-rendering:pixelated]"></canvas>
	<div class="absolute top-[10dvh] right-0 z-10 flex h-full w-full flex-col items-end gap-4 p-40">
		<!-- Current bout display -->
		<div
			class="flex h-auto w-1/4 flex-col items-center justify-center rounded-xl bg-primary p-4 text-center"
		>
			<p class="xl:text-2xl 2xl:text-3xl">Current Bout:</p>
			<h1 class="xl:text-4xl 2xl:text-6xl">{bountsList[currentBoutIndex].name}</h1>
		</div>

		<!-- Continue button -->
		<button
			class="btn h-1/8 w-1/4 rounded-xl p-8 btn-success xl:text-3xl 2xl:text-5xl"
			onclick={() => {
				bountsList[currentBoutIndex].completed = true;
				bouts.set(bountsList);
				resetCurrentBouts();
				xp += bountsList[currentBoutIndex].xp;
				totalXP.set(xp);
			}}
		>
			Next Bout!
		</button>

		<!-- Edit bouts -->
		<button
			class="btn h-1/8 w-1/4 rounded-xl p-8 btn-warning xl:text-3xl 2xl:text-5xl"
			onclick={() => goto('/bouts')}>Edit Bouts</button
		>

		<!-- End quest button -->
		<button
			onclick={endQuest}
			class="btn h-1/8 w-1/4 rounded-xl p-8 btn-error xl:text-3xl 2xl:text-5xl">End Quest</button
		>
	</div>
</main>
