import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/RespostaPadraoMsg";
import type { CadastroRequesicao } from "../../types/CadastroRequesicao";

const endPointCadastro = (
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

    return res.status(200).json({ msg: "Dados correstos " });
  }
  return res.status(405).json({ erro: "Metodo informado não existe" });
};

export default endPointCadastro;
