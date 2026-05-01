import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import type { Activity } from '$lib/types';

export const load: PageServerLoad = async () => {
	// Get activities from the last 4 weeks
	const today = new Date();
	const fourWeeksAgo = new Date(today);
	fourWeeksAgo.setDate(today.getDate() - 28);

	const startDate = fourWeeksAgo.toISOString().split('T')[0];
	const endDate = today.toISOString().split('T')[0];

	const activities = await db.collection<Activity>('activities')
		.find({ date: { $gte: startDate, $lte: endDate } })
		.sort({ date: 1 })
		.toArray();

	// Calculate weekly totals
	const weeklyData: { week: string; count: number; totalMinutes: number }[] = [];
	for (let w = 0; w < 4; w++) {
		const weekStart = new Date(fourWeeksAgo);
		weekStart.setDate(fourWeeksAgo.getDate() + w * 7);
		const weekEnd = new Date(weekStart);
		weekEnd.setDate(weekStart.getDate() + 6);

		const ws = weekStart.toISOString().split('T')[0];
		const we = weekEnd.toISOString().split('T')[0];

		const weekActivities = activities.filter(a => a.date >= ws && a.date <= we);
		weeklyData.push({
			week: 'Week ' + (w + 1),
			count: weekActivities.length,
			totalMinutes: weekActivities.reduce((sum, a) => sum + (a.duration || 0), 0)
		});
	}

	// Calculate type breakdown
	const typeBreakdown: Record<string, number> = {};
	for (const a of activities) {
		typeBreakdown[a.type] = (typeBreakdown[a.type] || 0) + 1;
	}

	// Training streak (consecutive days with non-rest activity)
	let streak = 0;
	const d = new Date(today);
	while (true) {
		const dateStr = d.toISOString().split('T')[0];
		const hasActivity = activities.some(a => a.date === dateStr && a.type !== 'rest');
		if (hasActivity) {
			streak++;
			d.setDate(d.getDate() - 1);
		} else {
			break;
		}
	}

	// Mood trend (last 14 days)
	const twoWeeksAgo = new Date(today);
	twoWeeksAgo.setDate(today.getDate() - 13);
	const moodStart = twoWeeksAgo.toISOString().split('T')[0];

	const moods = await db.collection('moods')
		.find({ date: { $gte: moodStart, $lte: endDate } })
		.sort({ date: 1 })
		.toArray();

	const moodTrend = moods.map(m => ({
		date: m.date,
		mood: m.mood
	}));

	// Average mood
	const avgMood = moods.length > 0
		? Math.round((moods.reduce((s, m) => s + m.mood, 0) / moods.length) * 10) / 10
		: null;

	return {
		weeklyData,
		typeBreakdown,
		streak,
		totalActivities: activities.filter(a => a.type !== 'rest').length,
		moodTrend: JSON.parse(JSON.stringify(moodTrend)),
		avgMood
	};
};
