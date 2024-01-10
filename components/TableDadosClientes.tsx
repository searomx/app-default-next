import React, { useState } from "react";

interface IdadosClientesProps {
  clientes: any[];
}

export default function TableDadosClientes(props: IdadosClientesProps) {
  return (
    <table className="flex flex-col h-full scroll-auto">
      <thead>
        <tr className="flex justify-center">
          <th className="flex w-[5%] bg-cyan-100">ID</th>
          <th className="flex w-[30%] bg-cyan-100">Nome</th>
          <th className="flex w-[30%] bg-cyan-100">Endereço</th>
          <th className="flex w-[25%] bg-cyan-100">Cidade</th>
          <th className="flex w-[5%] bg-cyan-100">Função</th>
          <th className="flex w-[5%] bg-cyan-100">Status</th>
        </tr>
      </thead>
      <tbody>
        {props.clientes.map((cliente) => (
          <tr key={cliente.key} className="flex w-full">
            <td className="text-black font-bold items-center mx-1 w-[5%]">
              {cliente.key}
            </td>
            <td className="text-black font-bold items-center w-[30%]">
              {cliente.name}
            </td>
            <td className="text-black font-bold items-center w-[30%]">
              {cliente.address}
            </td>
            <td className="text-black font-bold items-center w-[25%]">
              {cliente.city}
            </td>
            <td className="text-black font-bold items-center w-[5%]">
              {cliente.role}
            </td>
            <td className="text-black font-bold items-center w-[5%]">
              {cliente.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
