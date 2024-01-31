"use client"
import { ColumnDef } from "@tanstack/react-table"

export type TCnpjBase = {
  id: string
  cnpj: string
}

export const columns: ColumnDef<TCnpjBase>[] = [
  {
    accessorKey: "id",
    header: () => {
      return (
        <span className="justify-start">
          ID
        </span>
      )
    }

  },
  {
    accessorKey: "cnpj",
    header: () => {
      return (
        <span className="justify-start">
          CNPJ
        </span>
      )
    }
  },
]