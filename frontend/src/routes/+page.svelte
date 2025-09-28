<script>
	import { quests, currentQuest } from '$lib/stores.js';
	import { goto } from '$app/navigation';

	let questTitle = '';

	function addQuest() {
		if (!questTitle.trim()) {
			return;
		}
		const newQuest = {
			title: questTitle,
			xp: 0
		};
		quests.update((qs) => [...qs, newQuest]);
		questTitle = ''; // clear input
		currentQuest.set(newQuest);
		goto('/venture');
	}

	if ($quests.length > 0) {
		goto('/venture');
	}
</script>

<main class="flex h-screen w-full flex-col items-center justify-center gap-16 p-8">
	<section
		class="h-50 bg-base-200 rounded-4xl flex w-1/2 flex-col items-center justify-center text-center"
	>
		<h1 class="mb-8 text-5xl">What is your quest?</h1>
		<div class="flex w-1/2 gap-2">
			<input
				bind:value={questTitle}
				type="text"
				placeholder="Enter your quest"
				class="input input-bordered w-full"
			/>
			<button type="button" class="btn btn-primary" onclick={addQuest}>Embark</button>
		</div>
	</section>
</main>
