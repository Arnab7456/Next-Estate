import mongoose, { Schema, Document, Model } from "mongoose";

// Define a TypeScript interface for the User document
export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema
const userSchema: Schema<IUser> = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
