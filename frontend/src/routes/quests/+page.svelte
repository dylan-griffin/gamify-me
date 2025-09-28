<script>
  import { quests } from '$lib/stores.js';

  function removeQuest(title) {
    quests.update(qs => qs.filter(q => q.title !== title));
  }
</script>

<h1 class="text-3xl font-bold mb-4">Your Quests</h1>
<main></main>
<ul class="w-1/2">
  {#each $quests as q}
    <li class="flex items-center justify-between bg-base-200 p-2 rounded">
      <p>{q.title}</p>
      <button
        class="btn btn-error btn-sm"
        onclick={() => removeQuest(q.title)}
      >
        Remove
      </button>
    </li>
  {/each}
</ul>