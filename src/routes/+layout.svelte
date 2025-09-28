<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { totalXP } from '$lib/stores.js';

	let { children } = $props();
	const tooSmall = writable(false);

	let xp = $state(0);

	totalXP.subscribe((value) => {
		xp = value;
	});

	onMount(() => {
		const mq = window.matchMedia('(max-width: 1024px)');
		const update = () => tooSmall.set(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	});
</script>

<svelte:head>
	<title>Gamify.me</title>
	<link rel="icon" href="/gamify/favicon.png" />
</svelte:head>

{#if $tooSmall}
	<div class="flex h-screen w-full flex-col items-center justify-center gap-16 p-8 text-center">
		<h1 class="text-6xl text-error">Screen Too Small</h1>
		<p class="text-3xl text-error">
			For the best experience, please use a device with a larger screen (e.g., tablet, laptop,
			desktop).
		</p>
	</div>
{:else}
	<p class="absolute top-[12dvh] left-[2dvh] text-3xl 2xl:text-5xl">
		Lvl: {Math.floor(xp / 1000)} | XP: {xp}
	</p>
	<nav class="navbar flex h-[10dvh] w-full items-center justify-center bg-base-300">
		<a href="/" aria-label="Home" class="h-full">
			<enhanced:img src="/static/gamify/logo.png" alt="Logo" class="h-full w-auto" />
		</a>
	</nav>
	{@render children?.()}
	<footer class="footer-center footer bg-base-300 p-4 text-base-content">
		<div class="flex w-full items-center justify-center">
			<p>Copyright © 2024</p>
			<p class="ml-2">-</p>
			<enhanced:img src="/static/gamify/logo.png" alt="Logo" class="h-8 w-auto" />
		</div>
	</footer>
{/if}
