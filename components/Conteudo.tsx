import React, { useState } from "react";
import HeaderContainer from "./HeaderContainer";
import TableCnpjBase from "./TableCnpjBase";
import TableDadosClientes from "./TableDadosClientes";
import ListaCnpjBase from "../app/data/listacnpj";
import ListaClientes from "../app/data/listaClientes";
import Grid from "./Grid";

interface ConteudoProps {
  buscarCnpj: () => void;
}

export default function Conteudo() {
  return (
    <section>
      <div className="flex flex-col w-full min-h-[calc(100vh_-_14.5rem)] p-3">
        <div className="flex w-full">
          <Grid xl2={2} sm={1} md={2} lg={2} xl={2}>
            <div
              className={`flex-1
                      border border-solid border-zinc-400
                      max-h-[calc(100vh_-_14.8rem)]
                      rounded-md overflow-hidden
                      p-2 w-full bg-amber-400`}
            >
              <TableCnpjBase cnpj={ListaCnpjBase} />
            </div>

            <div
              className={`flex-3
                    border border-solid border-zinc-400
                    max-h-[calc(100vh_-_14.8rem)]
                    rounded-md
                    p-2 w-full bg-amber-400`}
            >
              <TableDadosClientes clientes={ListaClientes} />
            </div>
          </Grid>
        </div>
      </div>
    </section>
  );
}
