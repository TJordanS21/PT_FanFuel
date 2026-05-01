import type { ObjectId } from 'mongodb';

export interface Activity {
	_id?: ObjectId;
	title: string;
	type: 'gym' | 'match' | 'recovery' | 'rest' | 'cardio';
	date: string; // ISO date string YYYY-MM-DD
	time?: string;
	duration?: number; // minutes
	color: string;
	notes?: string;
}

export interface Recipe {
	_id?: ObjectId;
	title: string;
	description: string;
	image?: string;
	ingredients: string[];
	steps: string[];
	category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
	prepTime: number; // minutes
	calories?: number;
	protein?: number; // grams
	carbs?: number; // grams
	/** Activity types this recipe is ideal for */
	activityTags: Array<'gym' | 'match' | 'cardio' | 'recovery' | 'rest'>;
}

export interface MoodEntry {
	_id?: ObjectId;
	date: string;
	mood: 1 | 2 | 3 | 4 | 5;
	emoji: string;
	note?: string;
}

