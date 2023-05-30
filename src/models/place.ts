import { Schema, model } from "mongoose";

const placeSchema = new Schema({
    name: { type: String, required: true },
    images: { type: Schema.Types.Mixed , required: false },
    address: { type: String, required: false },
    postal_code: { type: Number, required: false },
    city: { type: String, required: false},
    reviews: { type: String, required: false } 
}, {versionKey: false});

const Place = model('Place', placeSchema);

export { Place };
