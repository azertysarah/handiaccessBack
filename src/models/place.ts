import { Schema, model } from "mongoose";

const reviewSchema = new Schema ({
    author: { type: String, required: false },
    date: { type: String, required: false },
    useful: { type: Number, required: false },
    useless: { type: Number, required: false },
    content: { type: String, required: false }
}, { versionKey: false });

const Review = model('Review', reviewSchema);

const placeSchema = new Schema({
    name: { type: String, required: true },
    images: { type: Schema.Types.Mixed , required: false },
    address: { type: String, required: false },
    postal_code: { type: Number, required: false },
    city: { type: String, required: false},
    reviews: { type: [reviewSchema], required: false } 
}, { versionKey: false });

const Place = model('Place', placeSchema);

export { Place, Review };
