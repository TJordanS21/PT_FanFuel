<script lang="ts">
	import SpotifySuggestion from '$lib/components/SpotifySuggestion.svelte';
	import MoodLogger from '$lib/components/MoodLogger.svelte';

	let { data } = $props();
</script>

<section class="dashboard">
	<div class="hero">
		<h1>{data.headerMessage}</h1>
		<p>Fuel your performance with the right nutrition and training.</p>
	</div>

	<h2>Today's Meals</h2>
	<div class="meals-grid">
		{#if data.meals.length > 0}
			{#each data.meals as meal}
				<div class="card meal-card">
					<div class="meal-type">{meal.mealType}</div>
					<h3>{meal.title}</h3>
					<a href="/learn/{meal.recipeId}" class="btn-primary">View Recipe</a>
				</div>
			{/each}
		{:else}
			<p class="empty">No meals planned for today. Add some in the Learn section!</p>
		{/if}
	</div>

	<div class="dashboard-extras">
		<MoodLogger />
		<SpotifySuggestion activityType={data.activityType} />
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 2rem 0 3rem;
	}

	.hero h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.hero p {
		color: var(--color-text-muted);
	}

	h2 {
		margin-bottom: 1rem;
	}

	.meals-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.meal-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.meal-type {
		text-transform: capitalize;
		font-size: 0.75rem;
		color: var(--color-primary);
		font-weight: 600;
	}

	.meal-card h3 {
		font-size: 1.1rem;
	}

	.meal-card a {
		margin-top: auto;
		text-align: center;
		text-decoration: none;
		padding: 0.5rem;
	}

	.empty {
		color: var(--color-text-muted);
	}

	.dashboard-extras {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.dashboard-extras { grid-template-columns: 1fr; }
	}
</style>
