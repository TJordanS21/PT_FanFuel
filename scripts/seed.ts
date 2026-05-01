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
	await db.collection('moods').deleteMany({});

	// Seed activities (current week)
	const today = new Date();
	const monday = new Date(today);
	monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

	const activities = [
		{ title: 'Gym Session', type: 'gym', date: fmt(monday, 0), color: '#ff6b35', duration: 60 },
		{ title: 'Recovery Yoga', type: 'recovery', date: fmt(monday, 1), color: '#4caf50', duration: 45 },
		{ title: 'Cardio Run', type: 'cardio', date: fmt(monday, 2), color: '#2196f3', duration: 30 },
		{ title: 'Rest Day', type: 'rest', date: fmt(monday, 3), color: '#9e9e9e', duration: 0 },
		{ title: 'Gym Session', type: 'gym', date: fmt(monday, 4), color: '#ff6b35', duration: 60 },
		{ title: 'Match Day', type: 'match', date: fmt(monday, 5), color: '#e91e63', duration: 90 },
		{ title: 'Recovery', type: 'recovery', date: fmt(monday, 6), color: '#4caf50', duration: 30 }
	];

	await db.collection('activities').insertMany(activities);

	// Seed recipes with activity tags
	const recipes = [
		{
			title: 'Protein Oatmeal',
			description: 'High-protein oatmeal with berries for sustained energy before heavy lifting.',
			ingredients: ['Oats (80g)', 'Protein powder (30g)', 'Banana (1)', 'Mixed berries (100g)', 'Almond milk (200ml)'],
			steps: ['Cook oats with almond milk', 'Stir in protein powder', 'Top with sliced banana and berries'],
			category: 'breakfast', prepTime: 15, calories: 450, protein: 35, carbs: 55,
			activityTags: ['gym', 'match']
		},
		{
			title: 'Chicken & Rice Bowl',
			description: 'Classic post-workout meal with lean protein and complex carbs.',
			ingredients: ['Chicken breast (200g)', 'Brown rice (150g)', 'Broccoli (100g)', 'Soy sauce (1 tbsp)', 'Sesame oil (1 tsp)'],
			steps: ['Cook rice according to package', 'Grill chicken breast', 'Steam broccoli', 'Assemble bowl and drizzle with soy sauce and sesame oil'],
			category: 'lunch', prepTime: 30, calories: 650, protein: 45, carbs: 60,
			activityTags: ['gym', 'cardio']
		},
		{
			title: 'Ginger Shot',
			description: 'Immune-boosting ginger shot to kickstart your morning.',
			ingredients: ['Fresh ginger (50g)', 'Lemon juice (1 lemon)', 'Honey (1 tsp)', 'Cayenne pepper (pinch)'],
			steps: ['Peel and chop ginger', 'Blend with lemon juice and water', 'Strain through fine mesh', 'Add honey and cayenne'],
			category: 'snack', prepTime: 10, calories: 35, protein: 0, carbs: 8,
			activityTags: ['recovery', 'rest', 'gym', 'match', 'cardio']
		},
		{
			title: 'Pasta Bolognese',
			description: 'Carb-loading classic – perfect the evening before a big match.',
			ingredients: ['Whole-wheat pasta (200g)', 'Lean ground beef (150g)', 'Tomato sauce (200ml)', 'Onion (1)', 'Garlic (2 cloves)', 'Parmesan (20g)'],
			steps: ['Cook pasta al dente', 'Sauté onion and garlic', 'Brown the beef', 'Add tomato sauce and simmer 15 min', 'Serve with parmesan'],
			category: 'dinner', prepTime: 35, calories: 720, protein: 38, carbs: 85,
			activityTags: ['match', 'cardio']
		},
		{
			title: 'Greek Yogurt & Granola',
			description: 'Quick high-protein snack with healthy fats for recovery days.',
			ingredients: ['Greek yogurt (200g)', 'Granola (40g)', 'Honey (1 tsp)', 'Walnuts (15g)', 'Blueberries (50g)'],
			steps: ['Spoon yogurt into bowl', 'Top with granola, walnuts, and blueberries', 'Drizzle with honey'],
			category: 'breakfast', prepTime: 5, calories: 380, protein: 22, carbs: 40,
			activityTags: ['recovery', 'rest']
		},
		{
			title: 'Salmon & Sweet Potato',
			description: 'Anti-inflammatory meal packed with omega-3s for muscle recovery.',
			ingredients: ['Salmon fillet (180g)', 'Sweet potato (200g)', 'Asparagus (100g)', 'Olive oil (1 tbsp)', 'Lemon (½)'],
			steps: ['Preheat oven to 200°C', 'Cube sweet potato and roast 20 min', 'Season salmon and bake 12 min', 'Steam asparagus', 'Plate and squeeze lemon'],
			category: 'dinner', prepTime: 40, calories: 580, protein: 40, carbs: 45,
			activityTags: ['gym', 'recovery']
		},
		{
			title: 'Banana Peanut Butter Smoothie',
			description: 'Fast pre-workout fuel with quick carbs and healthy fats.',
			ingredients: ['Banana (1)', 'Peanut butter (2 tbsp)', 'Milk (250ml)', 'Oats (30g)', 'Cinnamon (pinch)'],
			steps: ['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately'],
			category: 'snack', prepTime: 5, calories: 420, protein: 18, carbs: 50,
			activityTags: ['gym', 'cardio', 'match']
		},
		{
			title: 'Avocado Toast with Eggs',
			description: 'Balanced breakfast with healthy fats and protein – great for lighter days.',
			ingredients: ['Sourdough bread (2 slices)', 'Avocado (1)', 'Eggs (2)', 'Cherry tomatoes (50g)', 'Chili flakes'],
			steps: ['Toast bread', 'Mash avocado with salt and pepper', 'Fry or poach eggs', 'Spread avocado on toast, top with eggs and tomatoes', 'Sprinkle chili flakes'],
			category: 'breakfast', prepTime: 10, calories: 480, protein: 20, carbs: 35,
			activityTags: ['rest', 'recovery']
		},
		{
			title: 'Turkey Wrap',
			description: 'Light, portable lunch option packed with protein for on-the-go athletes.',
			ingredients: ['Whole-wheat tortilla (1)', 'Turkey slices (100g)', 'Lettuce', 'Tomato (1)', 'Hummus (2 tbsp)', 'Cucumber'],
			steps: ['Spread hummus on tortilla', 'Layer turkey, lettuce, tomato, and cucumber', 'Roll tightly and slice in half'],
			category: 'lunch', prepTime: 10, calories: 380, protein: 30, carbs: 35,
			activityTags: ['rest', 'recovery', 'cardio']
		}
	];

	await db.collection('recipes').insertMany(recipes);

	console.log('✅ Database seeded successfully!');
	console.log(`   - ${activities.length} activities`);
	console.log(`   - ${recipes.length} recipes`);

	await client.close();
}

function fmt(monday: Date, offsetDays: number): string {
	const d = new Date(monday);
	d.setDate(d.getDate() + offsetDays);
	return d.toISOString().split('T')[0];
}

seed().catch(console.error);
