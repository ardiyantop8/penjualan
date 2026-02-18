import React from 'react'
import { useTable, useSortBy, usePagination, useExpanded } from 'react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'
export const DataTable = ({
  columns,
  data,
  renderRowSubComponent,
  onHeaderClick,
  thisPage,
  perPage
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    visibleColumns,
    rows
  } = useTable(
    {
      columns,
      data,
      onHeaderClick,
      manualSortBy: true,
      thisPage,
      perPage
    },
    useSortBy,
    useExpanded,
    usePagination
  )

  return (
    <div>
      <Table {...getTableProps()}>
        {/* <TableHead
          sx={{
            '& th:first-child': {
                borderTopLeftRadius: '10px'
              },
              '& th:last-child': {
                borderTopRightRadius: '10px'
              }
          }}
        >
          {headerGroups.map((headerGroup, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: "#00529C"
              }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, index) => (
                <TableCell
                  key={index}
                  className="text-base"
                  sx={{ color: "#FFFFFF" }}
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      style: {
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        textAlign: column.align
                      }
                    })
                  )}
                  onClick={() => onHeaderClick(column)}
                >
                  <strong>{column.render('Header')}</strong>
                  <span className="ml-2">
                    {listColumnSorted.includes(column.id) ? (
                      column.sortDirection === '' ? (
                        <UnfoldMoreIcon
                          className="text-briRed"
                          fontSize="small"
                        />
                      ) : column.sortDirection === 'asc' ? (
                        <ArrowUpwardIcon
                          className="text-briRed"
                          fontSize="small"
                        />
                      ) : column.sortDirection === 'desc' ? (
                        <ArrowDownwardIcon
                          className="text-briRed"
                          fontSize="small"
                        />
                      ) : null
                    ) : null}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead> */}
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <React.Fragment key={row.getRowProps().key}>
                <TableRow>
                  {row.cells.map((cell, index) => {
                    return (
                      <TableCell
                        key={index}
                        sx={{ border: "1px solid #E0E0E0" }}
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            maxWidth: cell.column.maxWidth,
                            textAlign: cell.column.align
                          }
                        })}
                      >
                        <span>{cell.render('Cell')}</span>
                      </TableCell>
                    )
                  })}
                </TableRow>
                {row.isExpanded ? (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumns.length + 1}
                      style={{ padding: 0}}
                    >
                      {renderRowSubComponent({ row })}
                    </TableCell>
                  </TableRow>
                ) : null}
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
