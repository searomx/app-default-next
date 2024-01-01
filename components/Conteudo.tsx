import React, { useState } from "react";
import HeaderContainer from "./HeaderContainer";
import TableCnpjBase from "./TableCnpjBase";

interface ConteudoProps {
  dadosCnpj: string[];
}
const listaCnpj = [
  {
    id: "1",
    cnpj: "0000001",
  },
  { id: "2", cnpj: "0000002" },
  { id: "3", cnpj: "0000003" },
  { id: "4", cnpj: "0000002" },
  { id: "5", cnpj: "0000003" },
  { id: "6", cnpj: "0000002" },
  { id: "7", cnpj: "0000003" },
  { id: "8", cnpj: "0000002" },
  { id: "9", cnpj: "0000003" },
  { id: "10", cnpj: "0000002" },
  { id: "11", cnpj: "0000003" },
  { id: "12", cnpj: "0000002" },
  { id: "13", cnpj: "0000003" },
  { id: "14", cnpj: "0000002" },
  { id: "15", cnpj: "0000003" },
];

export default function Conteudo(props) {
  return (
    <section className="flex min-w-full p-3">
      <div className="flex min-w-full min-h-[calc(100vh_-_14.5rem)] p-3">
        <div className="grid grid-cols-2 w-full gap-4">
          <TableCnpjBase cnpj={listaCnpj} />
        </div>
      </div>
    </section>
  );
}
