import { ClerkProps } from "@/types/type";
import User from "../Model/UserModel";
import { connect } from "../mongodb/mongoose";



export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_address,
}: ClerkProps ) => {
  try {
    
    await connect();

    // Update the user if they exist, or create them if not
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_address,
        },
      },
      { upsert: true, new: true } // upsert creates a new document if none matches the filter
    );

    return user;
  } catch (error) {
    console.error("Error: Could not create or update user:", error);
    throw error; // Re-throw the error to ensure 
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    // Ensure database connection
    await connect();

    // Find and delete the user by their Clerk ID
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error: Could not delete user:", error);
    throw error; // Re-throw the error to ensure it is handled upstream
  }
};
