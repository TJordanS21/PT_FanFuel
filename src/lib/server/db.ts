import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export async function startMongo() {
	await client.connect();
	return client.db();
}

const db = client.db();

export default db;

