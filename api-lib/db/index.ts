import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';


const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}


type Mongoose = {
  conn: null | typeof import("mongoose"),
  promise: null | Promise<typeof import("mongoose")>
}
declare global {
  var mongooseGlobal: Mongoose;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongooseGlobal;

if (!cached) {
  cached = global.mongooseGlobal = { conn: null, promise: null };
}

async function connectDatabase(
  req: NextApiRequest|null = null, 
  res: NextApiResponse|null = null, 
  next: NextHandler | null = null) {

  if (cached.conn && next) {
    // return cached.conn;
    return next();
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    });
  }
  cached.conn = await cached.promise;

  if ( next ) {
    return next();
  }

  return cached.conn ;
}


export { connectDatabase };