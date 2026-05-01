<script lang="ts">
	import SpotifySuggestion from '$lib/components/SpotifySuggestion.svelte';
	import MoodLogger from '$lib/components/MoodLogger.svelte';

	let { data } = $props();

	const categoryEmoji: Record<string, string> = {
		breakfast: '🌅',
		lunch: '☀️',
		dinner: '🌙',
		snack: '⚡'
	};
</script>

<section class="dashboard">
	<div class="hero">
		<span class="hero-badge">{data.activityType.charAt(0).toUpperCase() + data.activityType.slice(1)} Day</span>
		<h1>{data.headerMessage}</h1>
		<p>Fuel your performance with the right nutrition and training.</p>
	</div>

	<div class="section-header">
		<h2>🍽️ Suggested Meals</h2>
		<span class="section-hint">Auto-picked for your {data.activityType} day</span>
	</div>
	<div class="meals-grid">
		{#if data.suggestedMeals.length > 0}
			{#each data.suggestedMeals as recipe}
				<a href="/learn/{recipe._id}" class="card meal-card">
					<div class="meal-header">
						<span class="meal-emoji">{categoryEmoji[recipe.category] || '🍴'}</span>
						<span class="meal-type">{recipe.category}</span>
					</div>
					<h3>{recipe.title}</h3>
					<p class="meal-desc">{recipe.description}</p>
					<div class="meal-meta">
						<span>⏱ {recipe.prepTime} min</span>
						{#if recipe.calories}
							<span>🔥 {recipe.calories} kcal</span>
						{/if}
						{#if recipe.protein}
							<span>💪 {recipe.protein}g protein</span>
						{/if}
					</div>
					<span class="view-link">View Recipe →</span>
				</a>
			{/each}
		{:else}
			<div class="card empty-card">
				<p>No meal suggestions available. <a href="/learn">Browse all recipes →</a></p>
			</div>
		{/if}
	</div>

	<div class="dashboard-extras">
		<MoodLogger todayMood={data.todayMood} />
		<SpotifySuggestion activityType={data.activityType} />
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 2.5rem 1rem 3rem;
		background: linear-gradient(135deg, rgba(219, 0, 7, 0.04) 0%, rgba(219, 0, 7, 0) 100%);
		border-radius: 16px;
		margin-bottom: 0.5rem;
	}

	.hero-badge {
		display: inline-block;
		background: var(--color-primary);
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.3rem 0.9rem;
		border-radius: 20px;
		margin-bottom: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.hero h1 {
		font-size: 2.2rem;
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}

	.hero p {
		color: var(--color-text-muted);
		font-size: 1.05rem;
	}

	.section-header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.section-header h2 {
		font-size: 1.25rem;
	}

	.section-hint {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.meals-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.meal-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color-text);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.meal-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
	}

	.meal-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.meal-emoji {
		font-size: 1.4rem;
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

	.meal-desc {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.4;
	}

	.meal-meta {
		display: flex;
		gap: 0.75rem;
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-top: auto;
		padding-top: 0.5rem;
	}

	.view-link {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-top: 0.25rem;
	}

	.empty-card {
		grid-column: 1 / -1;
		text-align: center;
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
		.meals-grid { grid-template-columns: repeat(2, 1fr); }
		.hero h1 { font-size: 1.6rem; }
	}
</style>
