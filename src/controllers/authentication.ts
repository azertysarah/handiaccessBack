import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export async function authenticate(req: Request, res: Response) : Promise<void> {
  try {
    const { gender, name, dateOfBirth, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      gender,
      name,
      dateOfBirth,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser.id }, 
      'your_secret_key', 
      { expiresIn: '5h' }
    );

    res.status(201).json({ message: 'Compte utilisateur créé avec succès.', token: token, user: newUser.name });
} catch (error) {
    console.error('Erreur lors de la création du compte utilisateur:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du compte utilisateur.' });
}
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id }, 
      'your_secret_key', 
      { expiresIn: '5h' }
    );

    res.status(201).json({ token: token, user: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}