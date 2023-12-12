import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from "../../middleware/conectarMongoDB";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import md5 from "md5";
import { UsuarioModel } from "../../models/UsuarioModel";

const endPointLogin = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  if (req.method === "POST") {
    const { login, senha } = req.body;
    const usuarioEncontrados = await UsuarioModel.find({
      email: login,
      senha: md5(senha),
    });
    if (usuarioEncontrados && usuarioEncontrados.length > 0) {
      const usuarioEncontrado = usuarioEncontrados[0];
      return res.status(200).json({ msg: `Usuario ${usuarioEncontrado.nome} autenticado com sucesso` });
    }
    return res.status(405).json({ erro: "Usuario ou senha Não informado" });
  }

  return res.status(405).json({ erro: "Metodo informado não é valido" });
};

export default conectarMongoDB(endPointLogin);
