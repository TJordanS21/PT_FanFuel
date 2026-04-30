<script lang="ts">
	let { data } = $props();
</script>

<section class="recipe-detail">
	<a href="/learn" class="back-link">&larr; Back to Recipes</a>

	<div class="recipe-header">
		<span class="category-badge">{data.recipe.category}</span>
		<h1>{data.recipe.title}</h1>
		<p>{data.recipe.description}</p>
		<div class="meta">
			<span>&#9201; {data.recipe.prepTime} min</span>
			{#if data.recipe.calories}
				<span>&#128293; {data.recipe.calories} kcal</span>
			{/if}
		</div>
	</div>

	<div class="recipe-body">
		<div class="card">
			<h2>Ingredients</h2>
			<ul>
				{#each data.recipe.ingredients as ingredient}
					<li>{ingredient}</li>
				{/each}
			</ul>
		</div>

		<div class="card">
			<h2>Steps</h2>
			<ol>
				{#each data.recipe.steps as step, i}
					<li>{step}</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.recipe-detail { display: flex; flex-direction: column; gap: 1.5rem; }
	.back-link { color: var(--color-primary); text-decoration: none; font-size: 0.875rem; }
	.back-link:hover { text-decoration: underline; }
	.recipe-header { text-align: center; }
	.category-badge { text-transform: capitalize; font-size: 0.75rem; background: var(--color-primary); color: white; padding: 0.25rem 0.75rem; border-radius: 12px; }
	.recipe-header h1 { margin: 1rem 0 0.5rem; }
	.recipe-header p { color: var(--color-text-muted); }
	.meta { display: flex; justify-content: center; gap: 1.5rem; margin-top: 0.75rem; color: var(--color-text-muted); font-size: 0.875rem; }
	.recipe-body { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
	.recipe-body h2 { margin-bottom: 0.75rem; font-size: 1.1rem; }
	.recipe-body ul, .recipe-body ol { padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
	.recipe-body li { font-size: 0.9rem; }

	@media (max-width: 768px) {
		.recipe-body { grid-template-columns: 1fr; }
	}
</style>
