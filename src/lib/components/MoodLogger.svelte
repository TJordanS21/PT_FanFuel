<script lang="ts">
	import { enhance } from '$app/forms';

	interface Props {
		todayMood?: number | null;
	}

	let { todayMood = null }: Props = $props();

	const moodLevels = [
		{ value: 1, emoji: '😣', label: 'Bad', color: '#ef4444', tip: 'Take it easy today. Focus on recovery and gentle movement.' },
		{ value: 2, emoji: '😕', label: 'Meh', color: '#f97316', tip: 'A light walk or stretch can lift your spirits.' },
		{ value: 3, emoji: '😐', label: 'Okay', color: '#eab308', tip: 'You\'re doing fine – stay consistent and fuel up well.' },
		{ value: 4, emoji: '😊', label: 'Good', color: '#22c55e', tip: 'Great energy! Push a little harder in your session today.' },
		{ value: 5, emoji: '💪', label: 'Great', color: '#10b981', tip: 'You\'re on fire! Perfect day to crush your goals.' }
	];

	let sliderValue = $state(todayMood ?? 3);
	let logged = $state(todayMood != null);

	const currentMood = $derived(moodLevels[sliderValue - 1]);
</script>

<div class="card mood-logger">
	<h3>How are you feeling today?</h3>

	{#if logged}
		<div class="mood-result">
			<span class="result-emoji">{currentMood.emoji}</span>
			<div class="result-info">
				<span class="result-label" style="color: {currentMood.color}">{currentMood.label}</span>
				<p class="result-tip">{currentMood.tip}</p>
			</div>
		</div>
	{:else}
		<form method="POST" action="?/logMood" use:enhance={() => {
			return async ({ update }) => {
				await update();
				logged = true;
			};
		}}>
			<div class="slider-display">
				<span class="slider-emoji">{currentMood.emoji}</span>
				<span class="slider-label" style="color: {currentMood.color}">{currentMood.label}</span>
			</div>

			<div class="slider-track">
				<input
					type="range"
					name="mood"
					min="1"
					max="5"
					step="1"
					bind:value={sliderValue}
					class="mood-slider"
					style="--track-color: {currentMood.color}"
				/>
				<div class="slider-labels">
					{#each moodLevels as level}
						<span class:active={sliderValue === level.value}>{level.emoji}</span>
					{/each}
				</div>
			</div>

			<input type="hidden" name="emoji" value={currentMood.emoji} />
			<button type="submit" class="btn-primary submit-btn">Log Mood</button>
		</form>
	{/if}
</div>

<style>
	.mood-logger h3 {
		margin-bottom: 1rem;
		font-size: 1rem;
	}

	/* Slider display */
	.slider-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.slider-emoji {
		font-size: 2.5rem;
		transition: transform 0.2s;
	}

	.slider-label {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Slider track */
	.slider-track {
		margin-bottom: 1rem;
	}

	.mood-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: var(--color-border);
		outline: none;
		cursor: pointer;
	}

	.mood-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--track-color, var(--color-primary));
		border: 3px solid white;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: background 0.2s;
	}

	.mood-slider::-moz-range-thumb {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--track-color, var(--color-primary));
		border: 3px solid white;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}

	.slider-labels {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
		font-size: 1rem;
		padding: 0 2px;
	}

	.slider-labels span {
		opacity: 0.35;
		transition: opacity 0.2s, transform 0.2s;
	}

	.slider-labels span.active {
		opacity: 1;
		transform: scale(1.25);
	}

	.submit-btn {
		width: 100%;
	}

	/* Result after logging */
	.mood-result {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 0.75rem;
		background: var(--color-bg);
		border-radius: 10px;
	}

	.result-emoji {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.result-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.result-label {
		font-weight: 700;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.result-tip {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.45;
	}
</style>
