<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	Chart.register(...registerables);

	let { data } = $props();
	let lineCanvas: HTMLCanvasElement;
	let doughnutCanvas: HTMLCanvasElement;
	let moodCanvas = $state<HTMLCanvasElement>();

	const moodEmojis = ['', '😣', '😕', '😐', '😊', '💪'];

	onMount(() => {
		// Weekly activity line chart
		new Chart(lineCanvas, {
			type: 'line',
			data: {
				labels: data.weeklyData.map(w => w.week),
				datasets: [
					{
						label: 'Activities',
						data: data.weeklyData.map(w => w.count),
						borderColor: '#db0007',
						backgroundColor: 'rgba(219, 0, 7, 0.1)',
						fill: true,
						tension: 0.3
					},
					{
						label: 'Minutes',
						data: data.weeklyData.map(w => w.totalMinutes),
						borderColor: '#333',
						backgroundColor: 'rgba(0, 0, 0, 0.05)',
						fill: true,
						tension: 0.3,
						yAxisID: 'y1'
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: { beginAtZero: true, title: { display: true, text: 'Sessions' } },
					y1: { position: 'right', beginAtZero: true, title: { display: true, text: 'Minutes' }, grid: { drawOnChartArea: false } }
				}
			}
		});

		// Type breakdown doughnut
		const typeLabels = Object.keys(data.typeBreakdown);
		const typeValues = Object.values(data.typeBreakdown);
		const typeColors = typeLabels.map(t => {
			const map: Record<string, string> = { gym: '#db0007', match: '#e91e63', recovery: '#4caf50', rest: '#9e9e9e', cardio: '#2196f3' };
			return map[t] || '#666';
		});

		new Chart(doughnutCanvas, {
			type: 'doughnut',
			data: {
				labels: typeLabels.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
				datasets: [{ data: typeValues, backgroundColor: typeColors }]
			},
			options: { responsive: true }
		});

		// Mood trend chart
		if (data.moodTrend.length > 0 && moodCanvas) {
			new Chart(moodCanvas, {
				type: 'line',
				data: {
					labels: data.moodTrend.map((m: { date: string }) => {
						const d = new Date(m.date + 'T00:00:00');
						return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
					}),
					datasets: [{
						label: 'Mood',
						data: data.moodTrend.map((m: { mood: number }) => m.mood),
						borderColor: '#eab308',
						backgroundColor: 'rgba(234, 179, 8, 0.1)',
						fill: true,
						tension: 0.35,
						pointBackgroundColor: data.moodTrend.map((m: { mood: number }) => {
							const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
							return colors[m.mood] || '#eab308';
						}),
						pointRadius: 6,
						pointHoverRadius: 8
					}]
				},
				options: {
					responsive: true,
					scales: {
						y: {
							min: 1,
							max: 5,
							ticks: {
								stepSize: 1,
								callback: (value) => moodEmojis[value as number] || value
							}
						}
					},
					plugins: {
						tooltip: {
							callbacks: {
								label: (ctx) => `${moodEmojis[ctx.raw as number]} (${ctx.raw}/5)`
							}
						}
					}
				}
			});
		}
	});
</script>

<section class="progress-page">
	<h1>Progress</h1>
	<p class="subtitle">Track your training and wellbeing over time.</p>

	<div class="stats-row">
		<div class="card stat-card">
			<div class="stat-value">{data.streak}</div>
			<div class="stat-label">Day Streak 🔥</div>
		</div>
		<div class="card stat-card">
			<div class="stat-value">{data.totalActivities}</div>
			<div class="stat-label">Activities (4 weeks)</div>
		</div>
		<div class="card stat-card">
			<div class="stat-value">{data.weeklyData.reduce((s, w) => s + w.totalMinutes, 0)}</div>
			<div class="stat-label">Total Minutes</div>
		</div>
		<div class="card stat-card">
			{#if data.avgMood}
				<div class="stat-value">{moodEmojis[Math.round(data.avgMood)]}</div>
				<div class="stat-label">Avg Mood ({data.avgMood}/5)</div>
			{:else}
				<div class="stat-value">—</div>
				<div class="stat-label">Avg Mood</div>
			{/if}
		</div>
	</div>

	<div class="charts-grid">
		<div class="card chart-card">
			<h2>My Development</h2>
			<canvas bind:this={lineCanvas}></canvas>
		</div>
		<div class="card chart-card">
			<h2>Activity Breakdown</h2>
			<canvas bind:this={doughnutCanvas}></canvas>
		</div>
	</div>

	{#if data.moodTrend.length > 0}
		<div class="card chart-card mood-chart">
			<h2>😊 Mood Trend</h2>
			<canvas bind:this={moodCanvas}></canvas>
		</div>
	{:else}
		<div class="card chart-card mood-chart">
			<h2>😊 Mood Trend</h2>
			<p class="empty-mood">No mood data yet. Log your mood on the Dashboard to see trends here.</p>
		</div>
	{/if}
</section>

<style>
	.progress-page { display: flex; flex-direction: column; gap: 1.5rem; }
	.subtitle { color: var(--color-text-muted); }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
	.stat-card { text-align: center; }
	.stat-value { font-size: 2rem; font-weight: 700; color: var(--color-primary); }
	.stat-label { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem; }
	.charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; }
	.chart-card h2 { margin-bottom: 1rem; font-size: 1rem; }
	.empty-mood { color: var(--color-text-muted); font-size: 0.875rem; }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.charts-grid { grid-template-columns: 1fr; }
	}
</style>
