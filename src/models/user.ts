// user.ts

import { Schema, model, Document } from 'mongoose';

// Définir l'interface du document User
interface IUser extends Document {
  gender: string;
  name: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

// Définir le schéma du modèle User
const userSchema = new Schema({
  gender: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Exportez le modèle User
export default model<IUser>('User', userSchema);
