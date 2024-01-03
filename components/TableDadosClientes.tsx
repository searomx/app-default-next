import React, { useState } from "react";

interface IdadosClientesProps {
  clientes: string[];
}

/*key: "4",
    name: "William Howard",
    address: "1234 Main St",
    city: "New York",
    role: "Community Manager",
    status: "Vacation",*/

export default function TableDadosClientes(props: IdadosClientesProps) {
  const { key, name, address, city, role, status } = props.clientes;
  console.log(props.clientes);
  return (
    <table className="flex flex-col min-w-full h-full scroll-auto">
      <thead>
        <tr className="flex min-w-full justify-center">
          <th className="flex w-full bg-cyan-100">ID</th>
          <th className="flex w-full bg-cyan-100">Nome</th>
          <th className="flex w-full bg-cyan-100">Endereço</th>
          <th className="flex w-full bg-cyan-100">Cidade</th>
          <th className="flex w-full bg-cyan-100">Função</th>
          <th className="flex w-full bg-cyan-100">Status</th>
        </tr>
      </thead>
      <tbody>
        {props.clientes.map((cliente) => (
          <tr key={cliente.key} className="flex min-w-full">
            <td className="text-black font-bold items-center mx-1">
              {cliente.key}
            </td>
            <td className="text-black font-bold items-center">
              {cliente.name}
            </td>
            <td className="text-black font-bold items-center">
              {cliente.address}
            </td>
            <td className="text-black font-bold items-center">
              {cliente.city}
            </td>
            <td className="text-black font-bold items-center">
              {cliente.role}
            </td>
            <td className="text-black font-bold items-center">
              {cliente.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
