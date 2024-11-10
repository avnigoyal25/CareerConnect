import { NextResponse } from "next/server";
import { db } from "@/utils";
import { USER} from "@/utils/schema";
import { eq } from "drizzle-orm/expressions";
import { authenticate } from "@/lib/jwtMiddleware";

export async function PUT(req) {

    const authResult = await authenticate(req);
    if (!authResult.authenticated) {
        return authResult.response;
        }

    const userData = authResult.decoded_Data;
    const userId = userData.userId;

    try {
        const data = await req.json();

         // Check if the new username is already in use
         if (data.username) {
            const [existingUser] = await db
                .select()
                .from(USER)
                .where(eq(USER.username, data.username))
                .execute();

            // If an existing user with the same username is found and it's not the current user, return an error
            if (existingUser && existingUser.id !== userId) {
                return NextResponse.json(
                    { message: "Username is already taken" },
                    { status: 409 } // Conflict
                );
            }
        }

        // Update user details in the database
        const result = await db.update(USER)
                        .set({
                        name: data?.name,
                        username: data?.username,
                        email:data?.email
                        })
                        .where(eq(USER.id, userId)); 
        
        if (!result) {
            return NextResponse.json(
              { message: "User update failed" },
              { status: 500 }
            );
          }


        return NextResponse.json(
        {
            message: "User updated successfully",
        },
        { status: 201 } // OK
        );
    } catch (error) {
        console.error("Error in PUT:", error);
        return NextResponse.json(
          { message: error.message || "An unexpected error occurred" },
          { status: 500 } // Internal Server Error
        );
      }
}
