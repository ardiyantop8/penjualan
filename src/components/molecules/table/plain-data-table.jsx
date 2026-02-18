import React from "react";
import { useTable, useSortBy, usePagination, useExpanded } from "react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  UnfoldMore as UnfoldMoreIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

export const PlainDataTable = ({
  columns,
  data,
  renderRowSubComponent,
  onHeaderClick = null,
  thisPage,
  perPage,
  className,
  EmptyComponent = null,
  showFooter = false,
  showFooterSorted = false,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    visibleColumns,
    rows,
  } = useTable(
    {
      columns,
      data,
      onHeaderClick,
      manualSortBy: true,
      thisPage,
      perPage,
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  // const indexNo = (thisPage - 1) * perPage + 1
  const listColumnSorted = ["full_name", "updated_at"];
  const borderStyle = "1px solid #E0E0E0";

  if (!EmptyComponent) {
    EmptyComponent = (
      <TableRow>
        <TableCell colSpan={columns.length} style={{ textAlign: "center" }}>
          Data tidak ditemukan
        </TableCell>
      </TableRow>
    );
  }

  return (
    <div className={className}>
      <Table {...getTableProps()}>
        <TableHead
          sx={{
            "& th:first-of-type": {
              borderTopLeftRadius: "10px",
            },
            "& th:last-child": {
              borderTopRightRadius: "10px",
            },
          }}
        >
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <TableCell
                  key={index}
                  className="text-lg"
                  sx={{
                    color: "black",
                    borderTop: borderStyle,
                    borderBottom: borderStyle,
                  }}
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      style: {
                        padding: column.padding ? column.padding : "6px 0px",
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        textAlign: column.headerAlign
                          ? column.headerAlign
                          : "center",
                        fontSize: column.fontSize ? column.fontSize : "13px",
                        width: column.width,
                      },
                    })
                  )}
                  onClick={() => onHeaderClick(column)}
                >
                  <strong>{column.render("Header")}</strong>
                  <span className="ml-2">
                    {listColumnSorted.includes(column.id) ? (
                      column.sortDirection === "" ? (
                        <UnfoldMoreIcon
                          className="text-briRed"
                          fontSize="small"
                        />
                      ) : column.sortDirection === "asc" ? (
                        <ArrowUpwardIcon
                          className="text-briRed"
                          fontSize="small"
                        />
                      ) : column.sortDirection === "desc" ? (
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
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.length === 0
            ? EmptyComponent
            : rows.map((row) => {
                prepareRow(row);
                return (
                  <React.Fragment key={row.getRowProps().key}>
                    <TableRow>
                      {row.cells.map((cell, index) => {
                        return (
                          <TableCell
                            key={index}
                            sx={{
                              borderTop: borderStyle,
                              borderBottom: borderStyle,
                            }}
                            {...cell.getCellProps({
                              style: {
                                minWidth: cell.column.minWidth,
                                maxWidth: cell.column.maxWidth,
                                textAlign: cell.column.align,
                                padding: cell.column.padding ?? "12px 8px",
                              },
                            })}
                          >
                            <span>{cell.render("Cell")}</span>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {row.original.isOpenSub ? (
                      <TableRow>
                        <TableCell
                          colSpan={visibleColumns.length + 1}
                          style={{ padding: 0 }}
                        >
                          {renderRowSubComponent({ row })}
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </React.Fragment>
                );
              })}
        </TableBody>
        {showFooter ? (
          <TableFooter
            sx={{
              "& th:first-of-type": {
                borderTopLeftRadius: "10px",
              },
              "& th:last-child": {
                borderTopRightRadius: "10px",
              },
            }}
          >
            {footerGroups.map((footerGroup, index) => (
              <TableRow key={index} {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column, index) => (
                  <TableCell
                    key={index}
                    className="text-base font-bold"
                    sx={{
                      color: "#000000",
                      borderTop: borderStyle,
                      borderBottom: borderStyle,
                    }}
                    {...column.getFooterProps(
                      column.getSortByToggleProps({
                        style: {
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                          textAlign: "center",
                          fontSize: "13px",
                          padding: "8px 12px",
                          width: column.width,
                        },
                      })
                    )}
                    onClick={() => onHeaderClick(column)}
                  >
                    <strong>{column.render("Footer")}</strong>
                    {showFooterSorted ? (
                      <span className="ml-2">
                        {listColumnSorted.includes(column.id) ? (
                          column.sortDirection === "" ? (
                            <UnfoldMoreIcon
                              className="text-briRed"
                              fontSize="small"
                            />
                          ) : column.sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              className="text-briRed"
                              fontSize="small"
                            />
                          ) : column.sortDirection === "desc" ? (
                            <ArrowDownwardIcon
                              className="text-briRed"
                              fontSize="small"
                            />
                          ) : null
                        ) : null}
                      </span>
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        ) : null}
      </Table>
    </div>
  );
};
