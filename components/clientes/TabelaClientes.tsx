import React from 'react';
import { DataTable } from '../data-table';
import { columns } from './columns';

interface TabelaClientesProps {
  dados: any[];
  showDataClienteAll: () => void;
}

export default function TabelaClientes({ dados }: { dados: any[] }) {
  function showDataClienteAll() {

  }
  return (
    <>
      <div className="flex flex-row justify-between">
        <button className="btn btn-blue my-2" onClick={() => showDataClienteAll()}>Obter Dados</button>
      </div>
      <div className="container text-black">
        <DataTable columns={columns} data={dados}></DataTable>
      </div>
    </>
  );
}
