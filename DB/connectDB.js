import { MongoClient } from "mongodb";

const uri = process.env.DB;
const dbName = process.env.DB_NAME || "micro-task";

if (!uri) throw new Error("Please define DB in environment variables");

let client = null;
let clientPromise = null;

async function connectClient() {
  if (client) return client;

  if (!clientPromise) {
    clientPromise = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    }).connect();
  }

  client = await clientPromise;
  console.log("MongoDB connected");
  return client;
}

export async function dbConnect() {
  const mongoClient = await connectClient();
  const db = mongoClient.db(dbName);
  return { client: mongoClient, db };
}