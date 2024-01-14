'use client';
import CompleteString from "@/lib/utils/completestring";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";

type TCnpj = {
  cnpj: string[];
};

export default function TableCnpjBase() {
  const [dados, setDados] = useState<TCnpj[]>([]);
  const [linha, setLinha] = useState('');
  const dataCnpj: TCnpj[] = [];
  let campo = "";
  let lineNumber = 0;



  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let txtcnpj = "";
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
          });
          setDados(dataCnpj as any[]);
        },
        error: (error) => {
          alert("Erro ao analisar o CSV: " + error.message);
        },
      });
    }
  }


  const itens = dados.map((row, index) => {
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
  useEffect(() => {
    const showLine = () => {
      if (lineNumber < dados.length) {
        console.log(dados[lineNumber].cnpj.toString());
        lineNumber++;
      } else {
        console.log('Fim do arquivo.');
        clearInterval(intervalId);
      }
    };
    const intervalId = setInterval(showLine, 1000);
  });

  return (
    <>
      <div className="flex gap-3 p-3 justify-center">

        <label htmlFor="selecao-arquivo" className="btn btn-blue">
          Selecionar um arquivo &#187;
        </label>
        <input
          id="selecao-arquivo"
          accept=".csv"
          type="file"
          onChange={handleFiles}
        />
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
