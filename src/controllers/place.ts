import { NextFunction, Request, Response } from "express";
import { Place } from "../models/place";
import { ObjectId } from "mongodb";

export async function getAllPlaces(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const places = await Place.find({});
        res.status(200).json(places);
    } catch(error) {
        console.debug(error);
        res.status(500);
    }
}

export async function getPlace(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const place = await Place.findById(req.params.id);
        res.status(200).json(place);
    } catch(error) {
        console.debug(error);
        res.status(500);
    }
}

export async function updatePlace(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const place = await Place.findById(req.params.id);
        if(req.body.review) {
            const newReview = {
                _id: new ObjectId(),
                author: req.body.author || '',
                date: new Date,
                useful: 0,
                useless: 0,
                content: req.body.review || ''
            }
            place?.reviews?.push(newReview);
            place?.save();
        }
        res.status(200);
    }catch(error) {
        console.debug(error);
        res.status(500);
    }
}