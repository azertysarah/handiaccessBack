import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export async function authenticate(req: Request, res: Response) : Promise<void> {
    const { gender, name, dateOfBirth, email, confirm_email, password, confirm_password } = req.body;
  
    // Vérifiez à nouveau si tous les champs requis sont présents
    if (!gender || !name || !dateOfBirth || !email || !confirm_email || !password || !confirm_password) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
    }
  
    // Vérifiez si les champs email et confirm_email correspondent
    if (email !== confirm_email) {
      res.status(400).json({ message: "L'adresse e-mail de confirmation ne correspond pas à l'adresse e-mail saisie." });
    }
  
    // Vérifiez si les champs password et confirm_password correspondent
    if (password !== confirm_password) {
      res.status(400).json({ message: 'Le mot de passe de confirmation ne correspond pas au mot de passe saisi.' });
    }
  
    try {
      // Vérifiez si l'utilisateur existe déjà dans la base de données
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà.' });
      }
  
      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Créez un nouvel utilisateur dans la base de données
      const newUser = new User({
        gender,
        name,
        dateOfBirth,
        email,
        password: hashedPassword,
      });
  
      // Sauvegardez l'utilisateur dans la base de données
      await newUser.save();
  
      // Répondre avec succès
      res.status(201).json({ message: 'Compte utilisateur créé avec succès.' });
    } catch (error) {
      // Gérer les erreurs lors de la création du compte utilisateur
      console.error('Erreur lors de la création du compte utilisateur:', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du compte utilisateur.' });
    }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  // Vérification des champs obligatoires
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    // Rechercher l'utilisateur dans la base de données (remplacer par votre logique de récupération de l'utilisateur)
    const user = await User.findOne({ email });

    // Vérification si l'utilisateur existe
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Authentification réussie, générer un token d'authentification (vous pouvez utiliser JWT, par exemple)
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}