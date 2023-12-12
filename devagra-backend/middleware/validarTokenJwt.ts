import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../types/RespostaPadraoMsg";
import jwt from "jsonwebtoken";

export const validarTokenJwt =
  (handler: NextApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
    const { MINHA_CHAVE_JWT } = process.env;
    if (!MINHA_CHAVE_JWT) {
      return res
        .status(500)
        .json({ erro: "ENV chave JWT não informada no process" });
    }

    if (!req || !req.headers) {
      return res
        .status(401)
        .json({ erro: "Não foi possivel validar o token de acesso" });
    }

    if (req.method !== "OPTIONS") {
      const authorization = req.headers["authorization"];

      if (!authorization) {
        return res
          .status(401)
          .json({ erro: "Não foi possivel validar o token de acesso" });
      }

      const token = authorization.substring(7);

      if (!token) {
        return res
          .status(401)
          .json({ erro: "Não foi possivel validar o token de acesso" });
      }

      const decoded = await jwt.verify()
    }
  };
