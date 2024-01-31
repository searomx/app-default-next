'use client';
import { useFetch } from "@/app/hooks/useFetch";
import { api } from "@/lib/api";
import CompleteString from "@/lib/utils/CompleteString";
import showToast from "@/lib/utils/showToast";
import Papa from "papaparse";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { clearInterval, setInterval } from "timers";
import { DataTableCnpj } from "./base/data-table-cnpj";
import { TCnpjBase, columns } from "./base/column-cnpj";
import PreviousMap from "postcss/lib/previous-map";
import ShowToast from "@/lib/utils/showToast";

type TCnpj = {
  id: string;
  cnpj: string;
};
type TDadosCliente = {
  id: number;
  nome: string;
  cnpj: string;
};


export default function TableCnpjBase() {
  const [dados, setDados] = useState<TCnpj[]>([]);
  const [dadosCliente, setDadosCliente] = useState<TDadosCliente[] | null>([]);
  const [idCnpj, setIdCnpj] = useState<string[]>([]);
  const [processando, setProcessando] = useState<boolean>(false);
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
    let cnpjs: TCnpj[] = [];
    let dadosCnpjs: TCnpj[] = [];
    const arquivo = e.target.files && e.target.files[0];
    if (arquivo) {
      Papa.parse(arquivo, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {

          cnpjs = results.data as TCnpj[];
          cnpjs.map((item: any) => {
            dadosCnpjs.push({ id: item.id, cnpj: CompleteString.formatarPadString(item.cnpj.toString(), 14, "0") });
          });
          console.log("lista cnpj:", cnpjs);
          setDados(dadosCnpjs);
          SaveAsCnpj(dadosCnpjs);
        },
        error: (error) => {
          alert("Erro ao analisar o CSV: " + error.message);
        },
      });
    }
  }
  async function SaveAsCnpj(cnpjs: TCnpj[]) {
    setProcessando(true);
    const result = await
      api.post("/api/base", cnpjs, {
        headers,
      }).then((response) => {
        const resp = response.data;
        // if (response.status === 200) {
        //   resp.map((item: any) => {
        //     setIdCnpj(prevDados => [...prevDados, item.id]);
        //     console.log("item-base:", item.id);
        //   })
        // }
        getMensagemResponse(response.status, response.data);
        console.log("response-base:", response.status);
        return response;
      });
    setProcessando(false);
    // idCnpj.map((item: any) => {
    //   console.log("item-id:", item);
    // });
    return;
  }

  const getMensagemResponse = (resp: number, cnpj: string) => {
    let resResp: number = resp;
    console.log("resResp:", resResp);
    let cnpjResp: string = cnpj;
    if (resResp === 200) {
      status = resResp;
      ShowToast.showToast("CNPJs Salvos com sucesso!", "success");
    } else if (resResp === 201) {
      ShowToast.showToast(`O CNPJ: ${cnpjResp} já existe na base de dados!`, "error");
    }
    return;
  }

  const getCnpjUnico = async (id: string) => {
    //const cnpj_validado = ValidaCnpj(cnpj);

    await api.get(`/api/base/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log("response:", response.data);
      return response.data;
    }).catch((error) => {
      console.log("error:", error);
    });

    // notify2();
  };

  // const itens = dados!.map((row) => {
  //   return (
  //     <tr key={index} className="flex min-w-full">
  //       <td className="text-black font-bold justify-center items-center mx-2 w-[20%]">
  //         {index + 1}
  //       </td>
  //       <td className="text-black font-bold justify-center items-center w-[80%] mx-2">
  //         {row.cnpj ? row.cnpj : "Sem CNPJ"}
  //       </td>
  //     </tr>
  //   );
  // });

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

  // const {
  //   isOpen: isVisible,
  //   onClose,
  //   onOpen,
  // } = useDisclosure({ defaultIsOpen: false });

  return (
    <>
      <div className="flex gap-3 p-3 justify-center">
        <label htmlFor="selecao-arquivo" className="btn btn-blue cursor-pointer">
          Selecionar um arquivo &#187;
        </label>
        <input
          id="selecao-arquivo"
          accept=".csv"
          type="file"
          onChange={handleFiles} />
      </div>
      <div className="container">
        <DataTableCnpj columns={columns} data={dados}></DataTableCnpj>
      </div>
    </>
  );
}
