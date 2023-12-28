import React, { useState } from "react";
import HeaderContainer from "./HeaderContainer";
import TableCnpjBase from "./TableCnpjBase";

export default function Conteudo(props) {
  return (
    <section className="flex min-w-full p-3">
      <div className="flex min-w-full min-h-[calc(100vh_-_14.5rem)] p-3">
        <div className="grid grid-cols-2 w-full gap-4">
          <TableCnpjBase />
        </div>
      </div>
    </section>
  );
}
