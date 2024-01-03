import React, { useState } from "react";

interface IdadosCnpjProps {
  cnpj: string[];
}

export default function TableCnpjBase(props: IdadosCnpjProps) {
  return (
    <table className="flex flex-col min-w-full h-full scroll-auto">
      <thead>
        <tr className="flex min-w-full justify-center">
          <th>ID</th>
          <th className="flex w-full justify-center bg-cyan-100">CNPJ-BASE</th>
        </tr>
      </thead>
      <tbody>
        {props.cnpj.map((cnpj, index) => (
          <tr key={cnpj} className="flex min-w-full">
            <td className="text-black font-bold justify-center items-center mx-1">
              {index + 1}
            </td>
            <td className="text-black font-bold justify-center items-center">
              {cnpj.cnpj}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
