import { NextFunction, Request, Response } from "express";
import { Place } from "../models/place";

enum MESSAGE {
    err_404 = 'The resource cannot be found'
}

export async function getAllPlaces(req: Request, res: Response, next: NextFunction) {
    try {
        const places = await Place.find({});
        res.status(200).json(places);
    } catch(error) {
        console.debug(error);
        res.status(500);
    }
}

export async function getPlace(req: Request, res: Response, next: NextFunction) {
    try {
        const place = await Place.findById(req.params.id);
        res.status(200).json(place);
    } catch(error) {
        console.debug(error);
        res.status(500);
    }
}