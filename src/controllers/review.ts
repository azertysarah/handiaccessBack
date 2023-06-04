import { NextFunction, Request, Response } from "express";
import { Place, Review } from "../models/place";
import { ObjectId } from "mongodb";

export async function updateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const counter = req.body.counter;
        const objectId = new ObjectId(req.params.id);
        let place;
        if(counter === 'useful') {
            place = await Place.findOneAndUpdate(
                { '_id': req.body.placeId, 'reviews._id': objectId },
                { $inc: { 'reviews.$.useful': 1 } },
                { new: true }
            );
        };
        if(counter === 'useless') {
            place = await Place.findOneAndUpdate(
                { '_id': req.body.placeId, 'reviews._id': objectId },
                { $inc: { 'reviews.$.useless': 1 } },
                { new: true }
            );
        };
        res.status(200);
    }catch(error) {
        console.debug(error);
        res.status(500);
    }
}