'use client';
import TableCnpjBase from "./TableCnpjBase";
import TabelaBase from "./base/TabelaBase";
import TableDadosClientes from "./clientes/TableDadosClientes";
import { useContext } from "react";

export default function Conteudo() {
  return (
    <>
      <div className="container h-[calc(100vh-13rem)] bg-blue-500 p-4">
        <div className="flex flex-col w-full h-full p-3 bg-emerald-400">
          <div className="flex justify-between w-full h-full ">
            <div
              className={`flex-initial
              border border-solid border-zinc-400

              rounded-md ml-4
              p-2`}
            >
              <TableCnpjBase />
            </div>
            <div
              className={`flex-1
                    border border-solid border-zinc-400
                    max-h-full
                    rounded-md ml-4
                    p-2`}
            >
              <TableDadosClientes />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
