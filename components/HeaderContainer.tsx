"use client";
import Papa from "papaparse";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Id, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ValidaCnpj from "@/lib/utils/validacnpj";
import CnpjBase from "@/app/models/cnpjbase";

type Idados = {
  id: number;
  cnpj: string;
  cnpjs: CnpjBase;
}

export default function HeaderContainer() {
  const [inputCnpjUnico, setCnpjUnico] = useState<string>("");
  const [inputToken, setInputToken] = useState<string>("");
  const toastId = React.useRef(null);

  const strtoken =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIiwibWVzc2FnZSI6IlRoYW5rcyBmb3IgdmlzaXRpbmcgbm96emxlZ2Vhci5jb20hIiwiaXNzdWVkIjoxNTU3MjU4ODc3NTI2fQ.NXd7lC3rFLiNHXwefUu3OQ-R203pGfB87-dIrk2S-vqfaygIWFwZKzmGHr6pzYkl2a0HkY0fdwa38yLWu8Zdhg";
  async function getCNPJ() {
    const token = "INFORME O SEU TOKEN DE ACESSO";
  }

  async function onEnviarToken() {
    if (inputToken.trim() === "") {
      return;
    }
    const response = await api.post("/api/cnpj", {
      token: inputToken,
    });
  }

  function getInputToken(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    if (inputToken.trim() === "") return;
    console.log(inputToken);
  }

  async function enviarCnpjUnico() {
    if (inputCnpjUnico.trim() === "") {
      return;
    }
    const cnpj_validado = ValidaCnpj(inputCnpjUnico);
    if (cnpj_validado) {
      await api.post("/api/unique", { cnpj: cnpj_validado });
      notify1();
    } else {
      notify2();
    }
  }

  const getCnpj = async (cnpj: string) => {
    const cnpj_validado = ValidaCnpj(cnpj);

    await api.get(`/api/unique/${cnpj_validado}`);
    notify2();
  };

  const notify1 = async () => toast("CNPJ enviado com sucesso!");
  const notify2 = async () => toast("CNPJ inválido!");

  return (
    <section className="flex min-w-full">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex min-w-full min-h-full bg-slate-900 text-white justify-around items-center">
        <div className="flex p-3">
          <label htmlFor="token" className="sr-only">
            Token
          </label>
          <textarea
            id="token"
            name="token"
            style={{ resize: "none" }}
            cols={80}
            rows={5}
            className={`flex p-2 w-full text-sm text-gray-900 bg-gray-50
  rounded-lg`}
            placeholder="Insira o Token..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
          ></textarea>
          <button onClick={onEnviarToken} className="botao botao-blue ml-3">
            Enviar
          </button>
        </div>
        <div className={`flex`}>
          <input
            type="text"
            onChange={(e) => setCnpjUnico(e.target.value)}
            value={inputCnpjUnico}
            className={`flex w-full p-2 text-sm text-gray-900 bg-gray-50
												rounded-lg`}
            placeholder="Digite o Cnpj..."
          />
          <div className={`flex ml-1`}>
            <button
              id="btn-enviar-individual"
              onClick={enviarCnpjUnico}
              className="botao botao-blue"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
