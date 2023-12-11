import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import type { CadastroRequesicao } from "../../types/CadastroRequesicao";
import { UsuarioModel } from "./../../models/UsuarioModel";
import md5 from "md5";
import { conectarMongoDB } from '../../middleware/conectarMongoDB';

const endPointCadastro = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  if (req.method === "POST") {
    const usuario = req.body as CadastroRequesicao;

    if (!usuario.nome || usuario.nome.length < 2) {
      return res.status(400).json({ msg: "Nome Invalido!" });
    }
    if (
      !usuario.email ||
      usuario.email.length < 5 ||
      !usuario.email.includes("@") ||
      !usuario.email.includes(".")
    ) {
      return res.status(400).json({ msg: "Email Invalido!" });
    }
    if (!usuario.senha || usuario.senha.length < 4) {
      return res.status(400).json({ msg: "Senha Invalida" });
    }

    const usuarioSalvo = {
      nome: usuario.nome,
      email: usuario.email,
      senha: md5(usuario.senha),
    };

    await UsuarioModel.create(usuarioSalvo);
    return res.status(200).json({ msg: "Usuario criados com sucesso " });
  }
  return res.status(405).json({ erro: "Metodo informado não É VALIDO" });
};

export default conectarMongoDB(endPointCadastro);
