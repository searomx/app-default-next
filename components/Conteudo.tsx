'use client';
import TableCnpjBase from "./TableCnpjBase";
import TableDadosClientes from "./TableDadosClientes";
import ListaClientes from "../app/data/listaClientes";
import { useContext } from "react";


export default function Conteudo() {
  return (
    <section>
      <div className="flex flex-col w-full min-h-[calc(100vh_-_14.5rem)] p-3">
        <div className="flex justify-between">
          <div
            className={`flex-initial
                      border border-solid border-zinc-400
                      max-h-[calc(100vh_-_14.8rem)]
                      rounded-md overflow-hidden
                      p-2  bg-amber-400`}
          >
            <TableCnpjBase />
          </div>

          <div
            className={`flex-1
                    border border-solid border-zinc-400
                    max-h-[calc(100vh_-_14.8rem)]
                    rounded-md
                    p-2 bg-amber-400`}
          >
            <TableDadosClientes />
          </div>
        </div>
      </div>
    </section>
  );
}
