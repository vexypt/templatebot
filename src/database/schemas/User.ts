import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    userId: string;
    balance: number;
    lastDaily: Date | null;
}

const UserSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    lastDaily: { type: Date, default: null }
});

export default model<IUser>("User", UserSchema);
