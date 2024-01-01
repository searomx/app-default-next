import { useState } from "react";

interface IdadosCnpjProps {
  cnpj: string[];
}

export default function TableCnpjBase(props: IdadosCnpjProps) {
  console.log("Propriedades: ", props.cnpj);

  return (
    <div
      className={` justify-between
    border-solid max-h-[calc(100vh_-_14.8rem)]
    rounded-md
    overflow-hidden p-1 w-1/2`}
    >
      <table className="flex flex-col scroll-auto">
        <thead>
          <tr className="flex min-w-full justify-center">
            <th>ID</th>
            <th className="flex w-full justify-center bg-cyan-500">
              CNPJ-BASE
            </th>
          </tr>
        </thead>
        <tbody>
          {props.cnpj.map((cnpj) => (
            <tr key={cnpj.id} className="flex min-w-full">
              <td className="flex text-black font-bold justify-center mx-1">
                {cnpj.id}
              </td>
              <td className="flex text-black font-bold justify-center mx-1">
                {cnpj.cnpj}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
