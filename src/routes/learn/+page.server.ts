import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import type { Recipe } from '$lib/types';

export const load: PageServerLoad = async () => {
	const recipes = await db.collection<Recipe>('recipes').find().toArray();
	return { recipes: JSON.parse(JSON.stringify(recipes)) };
};
