import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { eq } from "drizzle-orm";



import { db } from "./../../configs";
import { Users } from "./../../configs/schema";


function UserSync() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      createUserIfNotExists();
    }
  }, [user]);

  const createUserIfNotExists = async () => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.clerkUserId, user.id));

      if (result.length === 0) {
        await db.insert(Users).values({
          clerkUserId: user.id,
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          imageUrl: user.imageUrl,
        });

        console.log("Dodano użytkownika do bazy danych:", user.fullName);
      }
    } catch (error) {
      console.error("USER SYNC ERROR:", error);
    }
  };

  return null;
}

export default UserSync;
