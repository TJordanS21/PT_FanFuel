<script lang="ts">
	import { enhance } from '$app/forms';

	const moods = [
		{ value: 1, emoji: '&#128547;', label: 'Bad' },
		{ value: 2, emoji: '&#128533;', label: 'Meh' },
		{ value: 3, emoji: '&#128528;', label: 'Okay' },
		{ value: 4, emoji: '&#128522;', label: 'Good' },
		{ value: 5, emoji: '&#128170;', label: 'Great' }
	];

	let selectedMood = $state<number | null>(null);
</script>

<form method="POST" action="?/logMood" use:enhance class="card mood-logger">
	<h3>How are you feeling today?</h3>
	<div class="mood-options">
		{#each moods as mood}
			<button
				type="button"
				class="mood-btn"
				class:selected={selectedMood === mood.value}
				onclick={() => selectedMood = mood.value}
			>
				<span class="mood-emoji">{@html mood.emoji}</span>
				<span class="mood-label">{mood.label}</span>
			</button>
		{/each}
	</div>
	<input type="hidden" name="mood" value={selectedMood} />
	<input type="hidden" name="emoji" value={moods.find(m => m.value === selectedMood)?.emoji || ''} />
	{#if selectedMood}
		<button type="submit" class="btn-primary">Log Mood</button>
	{/if}
</form>

<style>
	.mood-logger h3 {
		margin-bottom: 0.75rem;
		font-size: 1rem;
	}
	.mood-options {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}
	.mood-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-bg);
		border: 2px solid var(--color-border);
		border-radius: 8px;
		transition: border-color 0.2s;
	}
	.mood-btn:hover {
		border-color: var(--color-primary);
	}
	.mood-btn.selected {
		border-color: var(--color-primary);
		background: rgba(219, 0, 7, 0.05);
	}
	.mood-emoji { font-size: 1.5rem; }
	.mood-label { font-size: 0.7rem; color: var(--color-text-muted); }
</style>
