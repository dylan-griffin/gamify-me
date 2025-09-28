<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let { children } = $props();
	const tooSmall = writable(false);

	onMount(() => {
		const mq = window.matchMedia('(max-width: 768px)');
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

<nav class="navbar bg-base-300 flex h-[10dvh] w-full items-center justify-center">
	<a href="/" aria-label="Home" class="h-full">
		<enhanced:img src="/static/gamify/logo.png" alt="Logo" class="h-full w-auto" />
	</a>
</nav>
{@render children?.()}
<footer class="footer footer-center bg-base-300 text-base-content p-4">
	<div class="flex w-full items-center justify-center">
		<p>Copyright © 2024</p>
		<p class="ml-2">-</p>
		<enhanced:img src="/static/gamify/logo.png" alt="Logo" class="h-8 w-auto" />
	</div>
</footer>
