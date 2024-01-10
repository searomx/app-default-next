import Papa from "papaparse";

interface IdadosCnpjProps {
  cnpj: any[];
}

const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();

  const arquivo = e.target.files?.[0];
  const dados: IdadosCnpjProps[] = [];
  if (arquivo) {
    Papa.parse(arquivo, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.map((e: any) => {
          dados.push(e as IdadosCnpjProps);
        });

        console.log("Dados do Tabela: ", dados);
      },
      error: (error) => {
        alert("Erro ao analisar o CSV: " + error.message);
      },
    });
  }
};

export default function TableCnpjBase(props: IdadosCnpjProps) {
  const itens = props.cnpj.map((cnpj, index) => {
    return (
      <tr key={index} className="flex min-w-full">
        <td className="text-black font-bold justify-center items-center mx-2 w-[20%]">
          {index + 1}
        </td>
        <td className="text-black font-bold justify-center items-center w-[80%] mx-2">
          {cnpj.cnpj ? cnpj.cnpj : "Sem CNPJ"}
        </td>
      </tr>
    );
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
