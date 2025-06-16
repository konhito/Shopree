import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  clerkId?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isClient: boolean;
  locker: string[];
  itemIsReady: boolean;
  itemReceivedData: Date | null;
  lockerNumber: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    clerkId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isClient: {
      type: Boolean,
      default: true,
    },
    locker: [
      {
        type: String,
        default: [],
      },
    ],
    itemIsReady: {
      type: Boolean,
      default: false,
    },
    itemReceivedData: {
      type: Date,
      default: null,
    },
    lockerNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Drop all existing indexes and create new ones
const dropAndCreateIndexes = async () => {
  try {
    const User = mongoose.model("User");
    // Drop all existing indexes
    await User.collection.dropIndexes();
    console.log("User: Dropped all existing indexes");

    // Create new indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex(
      { clerkId: 1 },
      { unique: true, sparse: true }
    );
    await User.collection.createIndex({ lockerNumber: 1 }, { unique: true });
    console.log("User: Created new indexes");
  } catch (error) {
    console.error("User: Error managing indexes:", error);
  }
};

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    console.log("User: Hashing password");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    console.error("User: Error hashing password:", error);
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("User: Error comparing password:", error);
    throw error;
  }
};

// Check if the model exists before creating a new one
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// Drop and recreate indexes when the model is first created
if (!mongoose.models.User) {
  dropAndCreateIndexes();
}

export default User;
