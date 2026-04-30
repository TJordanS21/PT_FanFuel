import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI;
if (!uri) {
	console.error('MONGODB_URI not set in .env');
	process.exit(1);
}

const client = new MongoClient(uri);

async function seed() {
	await client.connect();
	const db = client.db();

	// Clear existing data
	await db.collection('activities').deleteMany({});
	await db.collection('recipes').deleteMany({});
	await db.collection('meals').deleteMany({});

	// Seed activities (current week)
	const today = new Date();
	const monday = new Date(today);
	monday.setDate(today.getDate() - today.getDay() + 1);

	const activities = [
		{ title: 'Gym Session', type: 'gym', date: formatDate(monday, 0), color: '#ff6b35', duration: 60 },
		{ title: 'Recovery Yoga', type: 'recovery', date: formatDate(monday, 1), color: '#4caf50', duration: 45 },
		{ title: 'Cardio Run', type: 'cardio', date: formatDate(monday, 2), color: '#2196f3', duration: 30 },
		{ title: 'Rest Day', type: 'rest', date: formatDate(monday, 3), color: '#9e9e9e', duration: 0 },
		{ title: 'Gym Session', type: 'gym', date: formatDate(monday, 4), color: '#ff6b35', duration: 60 },
		{ title: 'Match Day', type: 'match', date: formatDate(monday, 5), color: '#e91e63', duration: 90 },
		{ title: 'Recovery', type: 'recovery', date: formatDate(monday, 6), color: '#4caf50', duration: 30 }
	];

	await db.collection('activities').insertMany(activities);

	// Seed recipes
	const recipes = [
		{
			title: 'Ginger Shot',
			description: 'Immune-boosting ginger shot to kickstart your morning.',
			ingredients: ['Fresh ginger (50g)', 'Lemon juice (1 lemon)', 'Honey (1 tsp)', 'Cayenne pepper (pinch)'],
			steps: ['Peel and chop ginger', 'Blend with lemon juice and water', 'Strain through fine mesh', 'Add honey and cayenne'],
			category: 'snack',
			prepTime: 10,
			calories: 35,
			image: ''
		},
		{
			title: 'Protein Oatmeal',
			description: 'High-protein oatmeal with berries for sustained energy.',
			ingredients: ['Oats (80g)', 'Protein powder (30g)', 'Banana (1)', 'Mixed berries (100g)', 'Almond milk (200ml)'],
			steps: ['Cook oats with almond milk', 'Stir in protein powder', 'Top with sliced banana and berries'],
			category: 'breakfast',
			prepTime: 15,
			calories: 450,
			image: ''
		},
		{
			title: 'Chicken & Rice Bowl',
			description: 'Classic post-workout meal with lean protein and carbs.',
			ingredients: ['Chicken breast (200g)', 'Brown rice (150g)', 'Broccoli (100g)', 'Soy sauce (1 tbsp)', 'Sesame oil (1 tsp)'],
			steps: ['Cook rice according to package', 'Grill chicken breast', 'Steam broccoli', 'Assemble bowl and drizzle with soy sauce and sesame oil'],
			category: 'lunch',
			prepTime: 30,
			calories: 650,
			image: ''
		}
	];

	const insertedRecipes = await db.collection('recipes').insertMany(recipes);
	const recipeIds = Object.values(insertedRecipes.insertedIds);

	// Seed meals for today
	const todayStr = today.toISOString().split('T')[0];
	const meals = [
		{ recipeId: recipeIds[1], date: todayStr, mealType: 'breakfast', title: 'Protein Oatmeal', image: '' },
		{ recipeId: recipeIds[2], date: todayStr, mealType: 'lunch', title: 'Chicken & Rice Bowl', image: '' },
		{ recipeId: recipeIds[0], date: todayStr, mealType: 'snack', title: 'Ginger Shot', image: '' }
	];

	await db.collection('meals').insertMany(meals);

	console.log('✅ Database seeded successfully!');
	console.log(`   - ${activities.length} activities`);
	console.log(`   - ${recipes.length} recipes`);
	console.log(`   - ${meals.length} meals`);

	await client.close();
}

function formatDate(monday: Date, offsetDays: number): string {
	const d = new Date(monday);
	d.setDate(d.getDate() + offsetDays);
	return d.toISOString().split('T')[0];
}

seed().catch(console.error);

