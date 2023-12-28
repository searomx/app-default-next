import { useState } from "react";

interface IdadosCnpjProps {
  getCnpjBase?: string[];
}

export default function TableCnpjBase(props: IdadosCnpjProps) {
  console.log(props.getCnpjBase);
  const [cnpjBase, setCnpjBase] = useState<IdadosCnpjProps[]>([]);
  const dados = props.getCnpjBase;
  return (
    <div className="border-solid border-zinc-400 rounded-md overflow-hidden p-1 w-1/2">
      <table className="flex flex-col justify-center w-1/2">
        <thead className="min-w-full">
          <tr className="min-w-full">
            <th className="min-w-full bg-slate-900 text-white font-bold justify-center">
              CNPJ-BASE
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {dados.map((cnpj) => (
            <tr key={+cnpj.id} className="min-w-full">
              <td className="min-w-full bg-slate-900 text-white font-bold justify-center">
                {cnpj.cnpj_base}
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
