<script>
	import '../app.css';
	import favicon from '/gamify/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Gamify.me</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
