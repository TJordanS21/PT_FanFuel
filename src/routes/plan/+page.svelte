<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let showForm = $state(false);
	let editingId = $state<string | null>(null);

	const activityTypes = ['gym', 'match', 'recovery', 'rest', 'cardio'];
</script>

<section class="plan-page">
	<div class="plan-header">
		<h1>Weekly Plan</h1>
		<button class="btn-primary" onclick={() => showForm = !showForm}>
			{showForm ? 'Cancel' : '+ Add Activity'}
		</button>
	</div>

	{#if form?.error}
		<div class="error-msg">{form.error}</div>
	{/if}
	{#if form?.success}
		<div class="success-msg">Activity saved successfully!</div>
	{/if}

	{#if showForm}
		<form method="POST" action="?/create" use:enhance class="card activity-form">
			<h3>New Activity</h3>
			<div class="form-grid">
				<label>
					Title
					<input name="title" type="text" required placeholder="e.g. Gym Session" />
				</label>
				<label>
					Type
					<select name="type" required>
						{#each activityTypes as t}
							<option value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
						{/each}
					</select>
				</label>
				<label>
					Date
					<input name="date" type="date" required />
				</label>
				<label>
					Duration (min)
					<input name="duration" type="number" min="0" value="60" />
				</label>
			</div>
			<label>
				Notes
				<textarea name="notes" rows="2" placeholder="Optional notes..."></textarea>
			</label>
			<button type="submit" class="btn-primary">Create Activity</button>
		</form>
	{/if}

	<div class="week-grid">
		{#each data.weekDays as day}
			<div class="day-column">
				<div class="day-label">{day.label}</div>
				{#each day.activities as activity}
					<div class="activity-tag" style="background: {activity.color}20; border-left: 3px solid {activity.color};">
						{#if editingId === activity._id}
							<form method="POST" action="?/update" use:enhance>
								<input type="hidden" name="id" value={activity._id} />
								<input name="title" value={activity.title} required />
								<select name="type">
									{#each activityTypes as t}
										<option value={t} selected={t === activity.type}>{t}</option>
									{/each}
								</select>
								<input name="date" type="date" value={activity.date} required />
								<input name="duration" type="number" value={activity.duration} />
								<textarea name="notes">{activity.notes || ''}</textarea>
								<div class="edit-actions">
									<button type="submit" class="btn-primary">Save</button>
									<button type="button" onclick={() => editingId = null}>Cancel</button>
								</div>
							</form>
						{:else}
							<div class="activity-content">
								<strong>{activity.title}</strong>
								{#if activity.duration}
									<span class="duration">{activity.duration} min</span>
								{/if}
							</div>
							<div class="activity-actions">
								<button onclick={() => editingId = activity._id} title="Edit">✏️</button>
								<form method="POST" action="?/delete" use:enhance style="display:inline;">
									<input type="hidden" name="id" value={activity._id} />
									<button type="submit" title="Delete">🗑️</button>
								</form>
							</div>
						{/if}
					</div>
				{:else}
					<div class="no-activity">No activity</div>
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
	.plan-page { display: flex; flex-direction: column; gap: 1.5rem; }
	.plan-header { display: flex; justify-content: space-between; align-items: center; }
	.error-msg { background: #f4433620; color: #f44336; padding: 0.75rem; border-radius: 8px; }
	.success-msg { background: #4caf5020; color: #4caf50; padding: 0.75rem; border-radius: 8px; }
	.activity-form { display: flex; flex-direction: column; gap: 1rem; }
	.form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
	.activity-form label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: var(--color-text-muted); }
	.activity-form input, .activity-form select, .activity-form textarea {
		background: var(--color-bg); color: var(--color-text); border: 1px solid #333;
		border-radius: 6px; padding: 0.5rem; font-size: 0.875rem;
	}
	.week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; }
	.day-column { display: flex; flex-direction: column; gap: 0.5rem; }
	.day-label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-align: center; padding: 0.5rem; background: var(--color-surface); border-radius: 6px; }
	.activity-tag { padding: 0.5rem; border-radius: 6px; font-size: 0.8rem; }
	.activity-content { display: flex; flex-direction: column; gap: 0.25rem; }
	.duration { font-size: 0.7rem; color: var(--color-text-muted); }
	.activity-actions { display: flex; gap: 0.25rem; margin-top: 0.25rem; }
	.activity-actions button { background: none; padding: 0.2rem; font-size: 0.75rem; }
	.edit-actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
	.no-activity { font-size: 0.75rem; color: var(--color-text-muted); text-align: center; padding: 1rem 0.5rem; }

	@media (max-width: 768px) {
		.week-grid { grid-template-columns: 1fr; }
	}
</style>
