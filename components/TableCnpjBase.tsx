import React, { useState } from "react";

interface IdadosCnpjProps {
  cnpj: any[];
}

export default function TableCnpjBase(props: IdadosCnpjProps) {
  return (
    <table className="flex flex-col scroll-auto p-4">
      <thead>
        <tr className="flex min-w-full justify-center">
          <th className="w-[20%]">ID</th>
          <th className="flex w-[80%] justify-center bg-cyan-100">CNPJ-BASE</th>
        </tr>
      </thead>
      <tbody>
        {props.cnpj.map((cnpj, index) => (
          <tr key={cnpj} className="flex min-w-full">
            <td className="text-black font-bold justify-center items-center mx-2 w-[20%]">
              {index + 1}
            </td>
            <td className="text-black font-bold justify-center items-center w-[80%] mx-2">
              {cnpj.cnpj}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
