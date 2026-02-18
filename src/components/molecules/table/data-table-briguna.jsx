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

export const DataTable = ({
  columns,
  data,
  renderRowSubComponent,
  onHeaderClick,
  thisPage,
  perPage,
  className,
  EmptyComponent = null,
  showFooter=false,
  showFooterSorted=false,
  isStickyHeader=false,
  columnSorted = [],
  autoFit = false
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

  const listColumnSorted =   columnSorted;
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
      <Table
      {...getTableProps()}
      sx={{
    ...(autoFit && {
      tableLayout: "auto", // ✅ hanya kalau autoFit true
      "& th, & td": {
        whiteSpace: "nowrap",
      },
    }),
  }}
>
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
            <TableRow
              key={index}
              sx={{
                backgroundColor: "#00529C",
              }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, index) => (
                <TableCell
                  key={index}
                  rowSpan={column.rowSpan ? column.rowSpan : 1}
                  className="text-base"
                  sx={{
                    color: "#FFFFFF",
                    borderLeft: index === 0 ? "none" : borderStyle,
                    borderRight:
                      index === headerGroup.headers.length - 1
                        ? "none"
                        : borderStyle,
                    borderBottom: borderStyle,
                    ...(isStickyHeader && {
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "#00529C",
                    }),
                  }}
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      style: {
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        textAlign: "center",
                        fontSize: "13px",
                        width: column.width,
                      },
                    })
                  )}
                  onClick={() => onHeaderClick(column)}
                >
                  <div className={listColumnSorted && listColumnSorted.length > 0 ? `flex items-center ${column.isCenter ? "justify-center" : "justify-between"} w-full` : ""}>
                    <strong>{column.render("Header")}</strong>
                    <span className="flex ml-2">
                      {listColumnSorted && listColumnSorted.includes(column.id) ? (
                        column.sortDirection === "" ? (
                          <UnfoldMoreIcon
                            className="text-briWhite"
                            fontSize="small"
                          />
                        ) : column.sortDirection === "asc" ? (
                          <ArrowUpwardIcon
                            className="text-briWhite"
                            fontSize="small"
                          />
                        ) : column.sortDirection === "desc" ? (
                          <ArrowDownwardIcon
                            className="text-briWhite"
                            fontSize="small"
                          />
                        ) : null
                      ) : null}
                    </span>
                  </div>
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
                // Tambahkan logika penentuan warna
            let bgColor = '';
            let textColor = '';

            switch (row.original.jenis) {
              case 'proses':
                bgColor = '#EAF3FA';
                textColor = '#00529C';
                break;
              case 'failed':
                bgColor = '#FFEAEA';
                textColor = 'black';
                break;
              case 'done':
                bgColor = '#EEFBF4';
                textColor = 'black';
                break;
              default:
                bgColor = 'white';
                textColor = 'black';
                break;
            }

            return (
              <React.Fragment key={row.getRowProps().key}>
                <TableRow
                  {...row.getRowProps()}
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <TableCell
                          key={index}
                          // sx={{ border: "1px solid #E0E0E0" }}
                          sx={{
                            border: "1px solid #E0E0E0",
                            backgroundColor: bgColor, // Terapkan warna di sini
                            color: textColor, // Terapkan warna teks di sini
                          }}
                          {...cell.getCellProps({
                            style: {
                              minWidth: cell.column.minWidth,
                              maxWidth: cell.column.maxWidth,
                              textAlign: cell.column.align,
                              padding: "8px 12px"
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
                      borderLeft: borderStyle,
                      borderRight: borderStyle,
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
