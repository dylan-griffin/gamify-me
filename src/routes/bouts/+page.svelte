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

	const scale = 6;
	const knightXOffset = -10;
	const knightYOffset = -30;
	const swordSwingStart = 120;

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
	<div class="absolute right-0 top-0 z-10 flex h-full w-full flex-col items-end justify-center">
		<h1 class="text-info bg-base-300 w-1/2 rounded-t-2xl p-2 text-center text-5xl underline">
			{$quest}
		</h1>
		<section
			class="bg-base-100 flex h-1/2 w-1/2 flex-col items-center justify-center gap-8 overflow-y-auto text-center"
		>
			{#if $bouts.length === 0}
				<p class="text-error text-4xl">No bouts added yet....</p>
			{/if}
			<div class="flex flex-col items-center justify-center gap-4 p-4">
				{#if $bouts.length > 0}
					<h2 class="text-4xl underline">Bouts</h2>
				{/if}
				{#each $bouts as bout, i}
					{#if bout.completed}
						<div class="flex w-full flex-row items-center justify-center gap-4 text-2xl line-through">
							<h2>{toRomanNumeral(i + 1)}: {bout.name}</h2>
							|
							<p class="text-info">Reward: {bout.xp}</p>
							|
							<!-- 🗑️ Remove button -->
							<button class="btn btn-error btn-sm" onclick={() => removeBout(i)}>Remove</button>
						</div>
					{:else}
						<div class="flex w-full flex-row items-center justify-center gap-4 text-2xl">
							<h2>{toRomanNumeral(i + 1)}: {bout.name}</h2>
							|
							<p class="text-info">Reward: {bout.xp}</p>
							|
							<!-- 🗑️ Remove button -->
							<button class="btn btn-error btn-sm" onclick={() => removeBout(i)}>Remove</button>
						</div>
					{/if}

					{#if i < $bouts.length - 1}
						<hr class="border-grey-300 w-5/6 border-t" />
					{/if}
				{/each}
			</div>
		</section>
		<section class="bg-base-200 flex w-1/2 items-center justify-center gap-8 p-4">
			<input
				type="text"
				placeholder="Bout name"
				class="input input-bordered text-2xl"
				bind:value={newBout}
			/>
			<button onclick={addBout} class="btn btn-primary">Add bout</button>
		</section>
		<button
			onclick={() => goto('/venture')}
			class="btn btn-success h-auto w-1/2 rounded-b-xl p-2 text-3xl">Embark</button
		>
	</div>
</main>
