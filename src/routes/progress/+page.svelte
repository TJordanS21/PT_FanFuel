<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	Chart.register(...registerables);

	let { data } = $props();
	let lineCanvas: HTMLCanvasElement;
	let doughnutCanvas: HTMLCanvasElement;

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
	});
</script>

<section class="progress-page">
	<h1>Progress</h1>
	<p class="subtitle">Track your training and see how you develop over time.</p>

	<div class="stats-row">
		<div class="card stat-card">
			<div class="stat-value">{data.streak}</div>
			<div class="stat-label">Day Streak</div>
		</div>
		<div class="card stat-card">
			<div class="stat-value">{data.totalActivities}</div>
			<div class="stat-label">Activities (4 weeks)</div>
		</div>
		<div class="card stat-card">
			<div class="stat-value">{data.weeklyData.reduce((s, w) => s + w.totalMinutes, 0)}</div>
			<div class="stat-label">Total Minutes</div>
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
</section>

<style>
	.progress-page { display: flex; flex-direction: column; gap: 1.5rem; }
	.subtitle { color: var(--color-text-muted); }
	.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
	.stat-card { text-align: center; }
	.stat-value { font-size: 2rem; font-weight: 700; color: var(--color-primary); }
	.stat-label { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem; }
	.charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; }
	.chart-card h2 { margin-bottom: 1rem; font-size: 1rem; }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: 1fr; }
		.charts-grid { grid-template-columns: 1fr; }
	}
</style>
