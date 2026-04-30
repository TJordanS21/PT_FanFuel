import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import type { Recipe } from '$lib/types';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	let recipe;
	try {
		recipe = await db.collection<Recipe>('recipes').findOne({ _id: new ObjectId(params.id) });
	} catch {
		throw error(404, 'Recipe not found');
	}

	if (!recipe) throw error(404, 'Recipe not found');

	return { recipe: JSON.parse(JSON.stringify(recipe)) };
};
