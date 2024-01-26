import { api } from "@/lib/api";
import { cnpjMask } from "@/lib/utils/cnpjMask";
import React, { useState } from "react";

type IdadosClientesProps = {
  nome: string;
  cnpj: string;
  municipio: string;
  uf: string;
}

export default function TableDadosClientes() {
  const [dados, setDados] = useState<IdadosClientesProps[]>([]);
  let lista: IdadosClientesProps[] = [];
  let intervalo: any;

  const temporizador = () => {
    intervalo = setInterval(() => showLine(), 1000);
  }
  const showLine = async () => {
    const resp = await api.post("/api/cnpj", { cnpj: "27998559000109" })
      .then((response) => {
        const resposta = response.data;
        console.log("response:", JSON.stringify(resposta));
        clearInterval(intervalo);
      }).catch((error) => {
        console.log("error:", error);
        clearInterval(intervalo);
      });
  }
  const showDataCliente = async () => {
    const resp = await api.get("/api/cliente/")
      .then((response) => {
        const resposta = response.data;
        console.log("response-get:", resposta);
        setDados(prevDados => [...prevDados, { nome: resposta.dados.nome, cnpj: resposta.dados.cnpj, municipio: resposta.dados.municipio, uf: resposta.dados.uf }]);
        clearInterval(intervalo);
      }).catch((error) => {
        console.log("error:", error);
        clearInterval(intervalo);
      });
  };

  const showDataClienteUnique = async () => {
    let xcnpj = '27998559000109';
    let cnpjFormatado: string = cnpjMask(xcnpj);
    console.log("cnpj-formatado: ", cnpjFormatado);
    const resp = await api.get("/api/cliente/1/",
      {
        params: {
          cnpj: cnpjFormatado
        }
      })
      .then((response) => {
        const resposta = response.data;
        console.log("response-get:", resposta.dados.nome);
        setDados(prevDados => [...prevDados, { nome: resposta.dados.nome, cnpj: resposta.dados.cnpj, municipio: resposta.dados.municipio, uf: resposta.dados.uf }]);
        clearInterval(intervalo);
      }).catch((error) => {
        console.log("error:", error);
        clearInterval(intervalo);
      });
    console.log("Listagem: ", dados);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <button className="btn btn-blue my-2" onClick={() => showDataClienteUnique()}>Obter Dados</button>
      </div>
      <div className="flex w-full max-h-[95%] p-3 border border-solid">
        <table className="flex flex-col max-h[90%] scroll-auto">
          <thead className="flex w-full">
            <tr className="flex flex-row">
              <th className="flex w-[45%] bg-cyan-100">Nome</th>
              <th className="flex w-[20%] bg-cyan-100">CNPJ</th>
              <th className="flex w-[25%] bg-cyan-100">Cidade</th>
              <th className="flex w-[5%] bg-cyan-100">Estado</th>

            </tr>
          </thead>
          <tbody>
            {dados.map((cliente, index) => (
              <tr key={index} className="flex w-full">
                <td className="text-black font-bold items-center w-[45%]">
                  {cliente.nome}
                </td>
                <td className="text-black font-bold items-center w-[20%]">
                  {cliente.cnpj}
                </td>
                <td className="text-black font-bold items-center w-[25%]">
                  {cliente.municipio}
                </td>
                <td className="text-black font-bold items-center w-[5%]">
                  {cliente.uf}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
