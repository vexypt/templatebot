import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.warn("MongoDB URI not found in environment variables. Database connection skipped.");
        return;
    }

    try {
        await mongoose.connect(mongoURI, {
            dbName: `${process.env.DB_NAME || "database"}`,
        });
        
        console.log("✅ Connected to MongoDB.");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
