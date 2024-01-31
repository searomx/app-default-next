import { api } from "@/lib/api";
import { cnpjMask } from "@/lib/utils/cnpjMask";
import React, { useState } from "react";
import CnpjBase from "@/app/models/CnpjBase";
import { DataTable } from "../data-table";
import { TCliente, columns } from "./columns";

export default function TableDadosClientes() {
  const [dados, setDados] = useState<any[]>([]);
  let intervalo: any;

  const temporizador = () => {
    intervalo = setInterval(() => showLine(), 1000);
  }
  const showLine = async () => {
    const resp = await api.post("/api/cnpj", { cnpj: "28975442000334" })
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
        const newDados = [...dados, {
          id: resposta.dados.id,
          nome: resposta.dados.nome,
          cnpj: resposta.dados.cnpj,
          cidade: resposta.dados.municipio,
          uf: resposta.dados.uf
        }];

        setDados(newDados);
        clearInterval(intervalo);
      }).catch((error) => {
        console.log("error:", error);
        clearInterval(intervalo);
      });
    console.log("Listagem: ", dados);
  };

  const showDataClienteAll = async () => {
    //let cnpjFormatado: string = cnpjMask('27998559000109');
    //console.log("cnpj-formatado: ", cnpjFormatado);
    const resp = await api.get("/api/cliente")
      .then(response => {
        const resposta = response.data;
        for (let i = 0; i < resposta.length; i++) {
          if (dados) {
            setDados(dados => [...dados, {
              id: resposta[i].id,
              nome: resposta[i].nome,
              cnpj: resposta[i].cnpj,
              cidade: resposta[i].municipio,
              uf: resposta[i].uf
            }]);
          }
        }

        clearInterval(intervalo);
      }).catch((error) => {
        console.log("error:", error);
        clearInterval(intervalo);
      });
    console.log("Listagem: ", { dados });
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <button className="btn btn-blue my-2" onClick={() => showDataClienteAll()}>Obter Dados</button>
      </div>
      <div className="container text-black">
        <DataTable columns={columns} data={dados}></DataTable>
      </div>
    </>
  );
}
