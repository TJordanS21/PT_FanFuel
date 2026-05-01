import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';
import type { Activity, Recipe } from '$lib/types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const today = new Date().toISOString().split('T')[0];

	const todayActivity = await db.collection<Activity>('activities').findOne({ date: today });

	// Dynamic header message
	let headerMessage = "Today it's a Rest Day 😴";
	const activityType = todayActivity?.type || 'rest';
	const headerMap: Record<string, string> = {
		match: "Today it's Match Day 🏆",
		gym: "Today it's Gym Day 💪",
		cardio: "Today it's Cardio Day 🏃",
		recovery: "Today it's Recovery Day 🧘"
	};
	if (todayActivity && headerMap[activityType]) {
		headerMessage = headerMap[activityType];
	}

	// Auto-suggest meals based on today's activity type
	const suggestedRecipes = await db.collection<Recipe>('recipes')
		.find({ activityTags: activityType })
		.toArray();

	// Pick one per category for a balanced day
	const categories: Array<'breakfast' | 'lunch' | 'dinner' | 'snack'> = ['breakfast', 'lunch', 'dinner', 'snack'];
	const suggestions = categories
		.map(cat => {
			const matches = suggestedRecipes.filter(r => r.category === cat);
			return matches.length > 0 ? matches[Math.floor(Math.random() * matches.length)] : null;
		})
		.filter(Boolean);

	// Load today's mood (if already logged)
	const todayMoodEntry = await db.collection('moods').findOne(
		{ date: today },
		{ sort: { _id: -1 } }
	);

	return {
		headerMessage,
		activityType,
		todayActivity: todayActivity ? JSON.parse(JSON.stringify(todayActivity)) : null,
		suggestedMeals: JSON.parse(JSON.stringify(suggestions)),
		todayMood: todayMoodEntry?.mood ?? null
	};
};

export const actions: Actions = {
	logMood: async ({ request }) => {
		const formData = await request.formData();
		const mood = Number(formData.get('mood'));
		const emoji = formData.get('emoji') as string;

		if (!mood || mood < 1 || mood > 5) {
			return fail(400, { error: 'Please select a mood.' });
		}

		const today = new Date().toISOString().split('T')[0];
		await db.collection('moods').insertOne({ date: today, mood, emoji });

		return { success: true };
	}
};
