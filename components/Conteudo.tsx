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
      <div className="flex w-full min-h-[calc(100vh_-_14.5rem)] p-3">
        <div className="flex w-full">
          <div className="w-full lg:w-4/5">
            <Grid sm={2} md={6} lg={8} xl={2} xl2={2}>
              <TableCnpjBase cnpj={ListaCnpjBase} />

              <TableDadosClientes clientes={ListaClientes} />
            </Grid>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4 w-full">
          <div
            className="flex-1"
            // className={`
            //           border border-solid border-zinc-400
            //           max-h-[calc(100vh_-_14.8rem)]
            //           rounded-md overflow-hidden
            //           p-2 h-full w-96 bg-amber-400`}
          >
            <TableCnpjBase cnpj={ListaCnpjBase} />
          </div>
          <div className="flex-2">
            <div
            // className={`flex-2
            //         border border-solid border-zinc-400
            //         max-h-[calc(100vh_-_14.8rem)]
            //         rounded-md overflow-hidden
            //         p-2 h-full w-full bg-amber-400`}
            >
              <TableDadosClientes clientes={ListaClientes} />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
