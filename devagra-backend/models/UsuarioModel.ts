import mongoose, { Schema } from "mongoose";

const UsuarioSchema = new Schema({
  nome: { type: "string", required: true },
  email: { type: "string", required: true },
  senha: { type: "string", required: true },
  avatar: { type: "string", required: false },
  seguidores: { type: "Number", default: 0 },
  seguindo: { type: "Number", default: 0 },
  publicacoes: { type: "Number", default: 0 },
});

export const UsuarioModel =
  mongoose.models.usuarios || mongoose.model("usuarios", UsuarioSchema);
