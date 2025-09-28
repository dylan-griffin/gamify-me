<script>
	import { quest, bouts } from '$lib/stores.js';
	import { goto } from '$app/navigation';

	let questTitle = '';

	function startQuest() {
		if (!questTitle) {
			return;
		}
		quest.set(questTitle.trim());
		bouts.set([]); // reset bouts for new quest
		goto('/bouts');
	}

	if ($quest) {
		if ($bouts.length <= 1) {
			goto('/bouts');
		} else {
			goto('/venture');
		}
	}
</script>

<main class="flex h-screen w-full flex-col items-center justify-center gap-16 p-8">
	<section
		class="bg-base-200 rounded-4xl flex h-auto w-3/4 flex-col items-center justify-center p-32 text-center"
	>
		<h1 class="mb-32 xl:text-6xl 2xl:text-8xl">What is your quest?</h1>
		<div class="flex w-full gap-8">
			<input
				bind:value={questTitle}
				type="text"
				placeholder="Enter your quest"
				class="input input-bordered h-auto w-full xl:text-4xl 2xl:text-6xl"
			/>
			<button type="button" class="btn btn-success h-auto xl:text-3xl 2xl:text-5xl" onclick={startQuest}
				>Embark</button
			>
		</div>
	</section>
</main>
