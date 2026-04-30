import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';
import type { Activity, Meal } from '$lib/types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const today = new Date().toISOString().split('T')[0];

	const todayActivity = await db.collection<Activity>('activities').findOne({ date: today });
	const meals = await db.collection<Meal>('meals').find({ date: today }).toArray();

	// Dynamic header message
	let headerMessage = "Today it's a Rest Day";
	if (todayActivity) {
		switch (todayActivity.type) {
			case 'match': headerMessage = "Today it's Match Day 🏆"; break;
			case 'gym': headerMessage = "Today it's Gym Day 💪"; break;
			case 'cardio': headerMessage = "Today it's Cardio Day 🏃"; break;
			case 'recovery': headerMessage = "Today it's Recovery Day 🧘"; break;
			default: headerMessage = "Today it's a Rest Day 😴";
		}
	}

	return {
		headerMessage,
		todayActivity: todayActivity ? JSON.parse(JSON.stringify(todayActivity)) : null,
		meals: JSON.parse(JSON.stringify(meals)),
		activityType: todayActivity?.type || 'rest'
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
