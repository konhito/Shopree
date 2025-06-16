import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  console.log("MongoDB: Attempting to connect to database...");

  if (cached.conn) {
    console.log("MongoDB: Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("MongoDB: Creating new connection");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("MongoDB: Successfully connected to database");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("MongoDB: Connection error:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
