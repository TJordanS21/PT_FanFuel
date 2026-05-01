import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';
import type { Activity } from '$lib/types';
import { ObjectId } from 'mongodb';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const today = new Date();
	const monday = new Date(today);
	monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);

	const startDate = monday.toISOString().split('T')[0];
	const endDate = sunday.toISOString().split('T')[0];

	const activities = await db.collection<Activity>('activities')
		.find({ date: { $gte: startDate, $lte: endDate } })
		.sort({ date: 1 })
		.toArray();

	const weekDays = [];
	for (let i = 0; i < 7; i++) {
		const d = new Date(monday);
		d.setDate(monday.getDate() + i);
		const dateStr = d.toISOString().split('T')[0];
		weekDays.push({
			date: dateStr,
			label: d.toLocaleDateString('de-CH', { weekday: 'short', month: 'short', day: 'numeric' }),
			activities: JSON.parse(JSON.stringify(activities.filter(a => a.date === dateStr)))
		});
	}

	return { weekDays };
};

const colorMap: Record<string, string> = {
	gym: '#ff6b35',
	match: '#e91e63',
	recovery: '#4caf50',
	rest: '#9e9e9e',
	cardio: '#2196f3'
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const type = formData.get('type') as string;
		const date = formData.get('date') as string;
		const duration = Number(formData.get('duration') || 0);
		const notes = (formData.get('notes') as string) || '';

		if (!title || !type || !date) {
			return fail(400, { error: 'Title, type, and date are required.' });
		}

		await db.collection('activities').insertOne({
			title, type, date, duration, notes,
			color: colorMap[type] || '#ff6b35'
		});

		return { success: true };
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const title = formData.get('title') as string;
		const type = formData.get('type') as string;
		const date = formData.get('date') as string;
		const duration = Number(formData.get('duration') || 0);
		const notes = (formData.get('notes') as string) || '';

		if (!id || !title || !type || !date) {
			return fail(400, { error: 'Missing required fields.' });
		}

		await db.collection('activities').updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { title, type, date, duration, notes, color: colorMap[type] || '#ff6b35' } }
		);

		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) return fail(400, { error: 'ID required.' });

		await db.collection('activities').deleteOne({ _id: new ObjectId(id) });
		return { success: true };
	}
};
