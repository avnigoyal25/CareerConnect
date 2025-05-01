import { db } from '@/utils';
import { QUERY, USER } from '@/utils/schema';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const data = await req.json();
    const { title, description } = data;
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;

    const insertedQuery =await db.insert(QUERY).values({
        userId,
        title,
        description,
        createdAt: new Date(),
      });

      const [user] = await db.select().from(USER).where(eq(USER.id, userId)).execute();

      return NextResponse.json({
        id: Date.now(), // Optional or replace with actual inserted id if retrievable
        user: {
          id: user.id,
          name: user.name,
        },
        title,
        description,
        createdAt: new Date(),
        replies: [],
      });

  } catch (error) {
    console.error("Error in postQuery route:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
