<script lang="ts">
	let { data } = $props();
</script>

<section class="learn-page">
	<h1>Learn</h1>
	<p class="subtitle">Discover recipes and nutrition tips for athletes.</p>

	<div class="recipe-grid">
		{#each data.recipes as recipe}
			<a href="/learn/{recipe._id}" class="card recipe-card">
				<div class="recipe-category">{recipe.category}</div>
				<h3>{recipe.title}</h3>
				<p>{recipe.description}</p>
				<div class="recipe-meta">
					<span>⏱ {recipe.prepTime} min</span>
					{#if recipe.calories}
						<span>🔥 {recipe.calories} kcal</span>
					{/if}
					{#if recipe.protein}
						<span>💪 {recipe.protein}g</span>
					{/if}
				</div>
				{#if recipe.activityTags?.length}
					<div class="recipe-tags">
						{#each recipe.activityTags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</a>
		{:else}
			<p>No recipes found. Run the seed script to add sample data.</p>
		{/each}
	</div>
</section>

<style>
	.learn-page { display: flex; flex-direction: column; gap: 1.5rem; }
	.subtitle { color: var(--color-text-muted); }
	.recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
	.recipe-card { text-decoration: none; color: var(--color-text); transition: transform 0.2s; }
	.recipe-card:hover { transform: translateY(-2px); }
	.recipe-category { text-transform: capitalize; font-size: 0.75rem; color: var(--color-primary); font-weight: 600; }
	.recipe-card h3 { margin: 0.5rem 0 0.25rem; }
	.recipe-card p { font-size: 0.875rem; color: var(--color-text-muted); }
	.recipe-meta { display: flex; gap: 1rem; font-size: 0.8rem; margin-top: 0.75rem; color: var(--color-text-muted); }
	.recipe-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.5rem; }
	.tag { font-size: 0.65rem; padding: 0.15rem 0.5rem; border-radius: 10px; background: var(--color-bg); color: var(--color-text-muted); text-transform: capitalize; }
</style>
