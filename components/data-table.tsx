'use client'

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Icon, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
  })

  return (
    <>
      {/* Filters */}
      <div className='flex min-w-full h-16 p-2 bg-slate-100 mb-3 rounded-md justify-between'>
        <div className='flex items-center'>
          <InputGroup size='sm' maxW="13rem" className='flex p-4'>
            <InputLeftElement pointerEvents='none' className='flex justify-center items-center p-4'>
              <Icon as={SearchIcon} color="gray.300" />
            </InputLeftElement>
            <Input
              type='text'
              placeholder='Buscar pelo nome...'
              value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
              onChange={event =>
                table.getColumn('nome')?.setFilterValue(event.target.value)
              }
              className='p-5 2xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm'
            />
          </InputGroup>
        </div>
        <div className='flex items-center py-4'>
          <InputGroup size='sm' maxW="13rem" className='flex p-4'>
            <InputLeftElement pointerEvents='none' className='flex justify-center items-center p-4'>
              <Icon as={SearchIcon} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder='Buscar pelo cnpj...'
              value={(table.getColumn('cnpj')?.getFilterValue() as string) ?? ''}
              onChange={event =>
                table.getColumn('cnpj')?.setFilterValue(event.target.value)
              }
              className='max-w-sm p-5'
            />
          </InputGroup>
        </div>
        <div className='flex items-center py-4'>
          <InputGroup size='sm' maxW="13rem" className='flex p-4'>
            <InputLeftElement pointerEvents='none' className='flex justify-center items-center p-4'>
              <Icon as={SearchIcon} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder='Buscar pela cidade'
              value={(table.getColumn('cidade')?.getFilterValue() as string) ?? ''}
              onChange={event =>
                table.getColumn('cidade')?.setFilterValue(event.target.value)
              }
              className='max-w-sm p-5 overflow-ellipsis'
            />
          </InputGroup>
        </div>
        <div className='flex items-center py-4'>
          <InputGroup size='sm' maxW="13rem" className='flex p-4'>
            <InputLeftElement pointerEvents='none' className='flex justify-center items-center p-4'>
              <Icon as={SearchIcon} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder='Buscar pelo estado...'
              value={(table.getColumn('uf')?.getFilterValue() as string) ?? ''}
              onChange={event =>
                table.getColumn('uf')?.setFilterValue(event.target.value)
              }
              className='max-w-sm p-5'
            />
          </InputGroup>
        </div>

        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className='rounded-md border border-solid p-4'>
        <Table className='bg-sky-300 justify-center items-center'>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Sem resultados!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 border border-solid rounded-sm bg-slate-300 p-4 '>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.setPageIndex(0)}
        >
          Primeira
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.getPageCount() - 1}
        >
          Última
        </Button>
      </div>
    </>
  )
}