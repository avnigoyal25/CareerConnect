import { db } from '@/utils';
import { QUERY, USER, REPLY } from '@/utils/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch all queries
    const queries = await db.select().from(QUERY).orderBy(QUERY.createdAt).execute();

    // Fetch all users and replies in one go
    const users = await db.select().from(USER).execute();
    const replies = await db.select().from(REPLY).orderBy(REPLY.createdAt).execute();

    // Map users and replies by their respective IDs for efficient lookup
    const userMap = new Map(users.map(user => [user.id, user]));
    const repliesByQueryId = new Map();

    for (const reply of replies) {
      if (!repliesByQueryId.has(reply.queryId)) {
        repliesByQueryId.set(reply.queryId, []);
      }
      repliesByQueryId.get(reply.queryId).push({
        ...reply,
        user: userMap.get(reply.userId) || null,
      });
    }

    // Attach user and replies to each query
    const result = queries.map(query => ({
      ...query,
      user: userMap.get(query.userId) || null,
      replies: repliesByQueryId.get(query.id) || [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in getAllQueries route:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
