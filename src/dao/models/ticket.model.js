import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    total: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
}, { timestamps: true });

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
