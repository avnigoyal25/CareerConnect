import { db } from '@/utils';
import { REPLY, USER } from '@/utils/schema';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function POST(req, { params }) {
    try {
        const queryId = parseInt(params.queryId);
        const body = await req.json();
        const { message } = body;

        // 🔐 Get the token from headers
        const headerList = headers();
        const token = headerList.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // 🔓 Decode the token to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.userId;

        // 📝 Insert the reply
        await db.insert(REPLY).values({
            queryId,
            userId,
            message,
            createdAt: new Date(),
        });

        const [user] = await db.select().from(USER).where(eq(USER.id, userId)).execute();

        return NextResponse.json({
            id: Date.now(), // or any generated ID if available
            queryId,
            user: {
                id: user.id,
                name: user.name,
            },
            message,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error('Error in postReply route:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
