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
  footerBgColor = "#FFFFFF"
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
  const listColumnSorted =   columnSorted;
  const borderStyle = "1px solid #E0E0E0";

  if (!EmptyComponent) {
    EmptyComponent = (
      <TableRow>
        <TableCell
          colSpan={columns.length} style={{ textAlign: "center" }}
        >Data tidak ditemukan</TableCell>
      </TableRow >
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
            <TableRow
              key={index}
              sx={{
                backgroundColor: "#00529C",
              }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, index) => {
                if (column.placeholderOf || column.Header === "") {
                  return null;
                }

                return (
                <TableCell
                  key={index}
                  className="text-base"
                  rowSpan={column.rowSpan ?? 1}
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
                    ...(column.sticky && { // Apply sticky styles only to sticky columns
                      position: "sticky",
                      zIndex: 1,
                      backgroundColor: "#00529C", // background color for sticky column cells
                      ...(column.sticky === "left" && { left: 0 }), // Set left if sticky on left
                      ...(column.sticky === "right" && { right: 0 }), // Set right if sticky on right
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
                        padding: column.headerPadding,
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
                </TableCell>
              )
            })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.length === 0 ? (
            EmptyComponent
          ) : (rows.map((row) => {
            prepareRow(row);
            const isDivider = row.original.isDivider;
            const dividerTitle = row.original.dividerTitle;
            return (
              <React.Fragment key={row.getRowProps().key}>
                {isDivider && (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumns.length}
                      sx={{
                        backgroundColor: "#F0F8FF",
                        fontWeight: "bold",
                        textAlign: "left",
                        border: "1px solid #E0E0E0",
                        padding: "12px 24px",
                      }}
                    >
                      {dividerTitle}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  {row.cells.map((cell, index) => {
                    return (
                      <TableCell
                        key={index}
                        sx={{
                          border: "1px solid #E0E0E0",
                          backgroundColor: 'white', // Terapkan warna di sini
                          color: 'black', // Terapkan warna teks di sini
                          ...(cell.column.cellOverflow && {
                            overflowX: cell.column.cellOverflow,
                            whiteSpace: 'nowrap',
                            scrollbarWidth: 'none', // For Firefox
                            msOverflowStyle: 'none', // For Internet Explorer and Edge
                            '&::-webkit-scrollbar': { display: 'none' }, // For Chrome, Safari, and Opera
                          }),
                          ...(cell.column.sticky && { // Apply sticky styles only to sticky columns
                            position: "sticky",
                            // zIndex: 2,
                            ...(cell.column.sticky === "left" && { left: 0 }), // Set left if sticky on left
                            ...(cell.column.sticky === "right" && { right: 0 }), // Set right if sticky on right
                          }),
                        }}
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            maxWidth: cell.column.maxWidth,
                            textAlign: cell.column.align,
                            padding: cell.column.noPadding === true ? "0px 0px" : "8px 12px",
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
          }))}
        </TableBody>
        {showFooter?
        <TableFooter
          sx={{
            backgroundColor: footerBgColor,
            "& th:first-of-type": {
              borderTopLeftRadius: "10px",
            },
            "& th:last-child": {
              borderTopRightRadius: "10px",
            },
          }}
        >
          {footerGroups.map((footerGroup, index) => (
            <TableRow
            key={index}
            {...footerGroup.getFooterGroupProps()}
            >
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
                  {showFooterSorted?
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
                  :null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
        :null}
      </Table>
    </div>
  );
};
