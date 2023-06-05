import { Request, Response, NextFunction } from "express";

export function checkFields(req: Request, res: Response, next: NextFunction): void {
try {
    const { gender, name, dateOfBirth, email, confirm_email, password, confirm_password } = req.body;
    if (!gender || !name || !dateOfBirth || !email || !confirm_email || !password || !confirm_password) {
        res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
    }
    
    if (email !== confirm_email) {
        res.status(400).json({ message: "L'adresse e-mail de confirmation ne correspond pas à l'adresse e-mail saisie." });
    }
    
    if (password !== confirm_password) {
        res.status(400).json({ message: 'Le mot de passe de confirmation ne correspond pas au mot de passe saisi.' });
    }
    next();
} catch(error){
    console.log(error);
    res.status(500).json({ message: 'Erreur serveur.' });
}
}