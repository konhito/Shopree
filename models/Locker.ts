import mongoose, { Schema, Document } from "mongoose";

export interface IShipmentItem {
  title: string;
  img: string;
  quantity: number;
  price: number;
  description?: string;
}

export interface ILocker extends Document {
  lockerNumber: string;
  items: IShipmentItem[];
  status: "pending" | "processing" | "shipped" | "delivered";
  totalValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const ShipmentItemSchema = new Schema<IShipmentItem>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  img: {
    type: String,
    required: [true, "Image URL is required"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    trim: true,
  },
});

const LockerSchema = new Schema<ILocker>(
  {
    lockerNumber: {
      type: String,
      required: [true, "Locker number is required"],
      unique: true,
      trim: true,
    },
    items: [ShipmentItemSchema],
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    totalValue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Calculate total value before saving
LockerSchema.pre("save", function (next) {
  this.totalValue = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});

// Create indexes
const createIndexes = async () => {
  try {
    const Locker = mongoose.model("Locker");
    // Create indexes
    await Locker.collection.createIndex({ lockerNumber: 1 }, { unique: true });
    console.log("Locker: Created indexes");
  } catch (error) {
    console.error("Locker: Error creating indexes:", error);
  }
};

// Check if the model exists before creating a new one
const Locker =
  mongoose.models.Locker || mongoose.model<ILocker>("Locker", LockerSchema);

// Create indexes when the model is first created
if (!mongoose.models.Locker) {
  createIndexes();
}

export default Locker;
