'use client';
import { useFetch } from "@/app/hooks/useFetch";
import { api } from "@/lib/api";
import CompleteString from "@/lib/utils/completestring";
import error from "next/error";
import Papa from "papaparse";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { clearInterval, setInterval } from "timers";


type TCnpj = {
  cnpj: string[];
};
type TDadosCliente = {
  id: number;
  nome: string;
  cnpj: string;
};


export default function TableCnpjBase() {
  const [dados, setDados] = useState<TCnpj[] | null>([]);
  const [dadosCliente, setDadosCliente] = useState<TDadosCliente[] | null>([]);
  const [resposta, setResposta] = useState<number>(0);
  const dataCnpj: TCnpj[] = [];
  let campo = "";
  let intervalo: any;
  let lineNumber = 0;
  let status: number = 0;
  const bodyFormData = new FormData();

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let txtcnpj = "";
    let cnpjs: string[] = [];
    const arquivo = e.target.files && e.target.files[0];
    if (arquivo) {
      Papa.parse(arquivo, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          results.data.map((item: any) => {
            txtcnpj = item.cnpj.toString();
            campo = CompleteString(txtcnpj, 14, "0");
            dataCnpj.push({ cnpj: [campo] });
            cnpjs.push(campo);
          });
          setDados(dataCnpj);
          SaveAsCnpj(cnpjs);
        },
        error: (error) => {
          alert("Erro ao analisar o CSV: " + error.message);
        },
      });
    }
  }
  async function SaveAsCnpj(cnpjs: string[]) {
    const result = await
      api.post("/api/base", cnpjs, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        getMensagemResponse(response.status);
      })
        .catch(function (error) {
          console.warn(error.message);
        });
    return result;
  }
  const getMensagemResponse = (resp: number) => {
    let resResp: number = resp;
    if (resResp === 200) {
      status = resResp;
      notify1();
      return console.log("Dados salvos com sucesso!", status);
    } else {
      status = resResp;
      notify2();
      return console.log("Erro ao salvar os dados!", status);
    }
  }


  const itens = dados!.map((row, index) => {
    return (
      <tr key={index} className="flex min-w-full">
        <td className="text-black font-bold justify-center items-center mx-2 w-[20%]">
          {index + 1}
        </td>
        <td className="text-black font-bold justify-center items-center w-[80%] mx-2">
          {row.cnpj ? row.cnpj : "Sem CNPJ"}
        </td>
      </tr>
    );
  });

  const temporizador = () => {
    intervalo = setInterval(() => showLine(), 1000);
  }

  const showLine = async () => {
    const resp = await api.post("/api/cnpj", { cnpj: "16701716000156" })
      .then((response) => {
        const resposta = response.data;
        console.log("response:", JSON.stringify(resposta));
        clearInterval(intervalo);
      }).catch((error) => {
        console.log("error:", error);
        clearInterval(intervalo);
      });
  }
  const notify1 = async () => toast("CNPJ Salvo com sucesso!");
  const notify2 = async () => toast("CNPJ já existe no banco de dados!");

  // const showLine = async () => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   let strCnpj = "";
  //   if (lineNumber < dados.length) {
  //     strCnpj = dados[0].cnpj.toString();
  //     console.log("cnpj-x: ", strCnpj);
  //     const { data } = await api.post("/api/cnpj", { cnpj: dados[lineNumber].cnpj }, { signal: signal });
  //     const resp = JSON.parse(data);
  //     console.log("response:", resp);

  //     lineNumber++;
  //   } else {
  //     console.log('Fim do arquivo.');
  //     clearInterval(intervalo);
  //   }
  // };



  // const showLine = async (quant: number) => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   dados.forEach((item, index, array) => {
  //     if (index < quant) {
  //       linhaCnpj.push(item.cnpj as any);
  //       console.log("index: ", index);
  //     }

  //   });
  //   console.log("cnpj-selecionado: ", linhaCnpj);

  //   await api.post("/api/cnpj", { cnpj: '' }, {
  //     signal: signal
  //   }).then((response) => {
  //     const resp = JSON.parse(response.data);
  //     console.log("response:", resp);
  //   }).catch((error) => {
  //     controller.abort();
  //     console.log("error:", error);
  //   });
  //   clearInterval(intervalo);
  // };


  // const intervalId = setInterval(showLine, 1000);


  // async function enviarCnpjUnico() {
  //   if (inputCnpjUnico.trim() === "") {
  //     return;
  //   }

  //   const cnpj_validado = ValidaCnpj(inputCnpjUnico);
  //   if (cnpj_validado) {
  //     await api.post("/api/unique", { cnpj: cnpj_validado });
  //     notify1();
  //   } else {
  //     notify2();
  //   }
  // }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <div className="flex gap-3 p-3 justify-center">
        <label htmlFor="selecao-arquivo" className="btn btn-blue">
          Selecionar um arquivo &#187;
        </label>
        <input
          id="selecao-arquivo"
          accept=".csv"
          type="file"
          onChange={handleFiles} />
        <button className="btn btn-blue" onClick={() => temporizador()}>Obter Dados</button>
      </div>
      <table className="flex flex-col scroll-auto p-4">
        <thead>
          <tr className="flex min-w-full justify-center">
            <th className="w-[20%]">ID</th>
            <th className="flex w-[80%] justify-center bg-cyan-100">
              CNPJ-BASE
            </th>
          </tr>
        </thead>
        <tbody>{itens}</tbody>
      </table>

    </>

  );
}
