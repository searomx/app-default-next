import { columns } from "./column-cnpj";
import { DataTableCnpj } from "./data-table-cnpj";

interface TabelaBaseProps {
  dados?: any[];
  handleFiles?: () => void;
}

export default function TabelaBase(props: TabelaBaseProps) {
  return (
    <>
      <div className="container text-black">
        <DataTableCnpj columns={columns} data={props.dados ?? []}></DataTableCnpj>
      </div>
    </>
  )
}