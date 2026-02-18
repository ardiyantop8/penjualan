import React from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useExpanded,
} from "react-table";
import {
  Table,
  TableBody,
  TableCell,
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
  onHeaderClick,
  thisPage,
  perPage,
  className,
  EmptyComponent = null,
  isStickyHeader = true,
  columnSorted = [],
  tableHeight = "400px",
  tableOverflowY = "auto",
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
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

  const listColumnSorted = columnSorted;
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
    <div
      className={className}
      style={{
        overflowX: "auto",
        overflowY: tableOverflowY,
        maxHeight: tableHeight,
        position: "relative", // penting untuk sticky
      }}
    >
      <Table {...getTableProps()}>
        {/* ===== HEADER ===== */}
        <TableHead
          sx={{
            "& th:first-of-type": { borderTopLeftRadius: "10px" },
            "& th:last-child": { borderTopRightRadius: "10px" },
          }}
        >
          {headerGroups.map((headerGroup, hIndex) => (
            <TableRow
              key={hIndex}
              {...headerGroup.getHeaderGroupProps()}
              sx={{
                backgroundColor: "#00529C",
              }}
            >
              {headerGroup.headers.map((column, cIndex) => (
                <TableCell
                  key={cIndex}
                  sx={{
                    color: "#FFFFFF",
                    borderLeft: cIndex === 0 ? "none" : borderStyle,
                    borderRight:
                      cIndex === headerGroup.headers.length - 1
                        ? "none"
                        : borderStyle,
                    borderBottom: borderStyle,
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                    // Sticky header (top)
                    ...(isStickyHeader && {
                      position: "sticky",
                      top: 0,
                      zIndex: 3,
                      background: "#00529C",
                    }),
                    // Sticky column left/right di header
                    ...(column.sticky === "left" && {
                      position: "sticky",
                      left: 0,
                      zIndex: 4,
                      background: "#00529C",
                    }),
                    ...(column.sticky === "right" && {
                      position: "sticky",
                      right: 0,
                      zIndex: 4,
                      background: "#00529C",
                    }),
                  }}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={() => onHeaderClick && onHeaderClick(column)}
                >
                  <strong>{column.render("Header")}</strong>
                  <span style={{ marginLeft: "4px" }}>
                    {listColumnSorted.includes(column.id) ? (
                      column.sortDirection === "" ? (
                        <UnfoldMoreIcon fontSize="small" />
                      ) : column.sortDirection === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )
                    ) : null}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        {/* ===== BODY ===== */}
        <TableBody {...getTableBodyProps()}>
          {rows.length === 0 ? (
            EmptyComponent
          ) : (
            rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.getRowProps().key}>
                  {row.cells.map((cell, cIndex) => (
                    <TableCell
                      key={cIndex}
                      sx={{
                        border: borderStyle,
                        backgroundColor: "white",
                        color: "black",
                        textAlign: cell.column.align || "center",
                        padding: cell.column.noPadding ? "0px" : "8px 12px",
                        // Sticky column left/right di body
                        ...(cell.column.sticky === "left" && {
                          position: "sticky",
                          left: 0,
                          zIndex: 2,
                          backgroundColor: "white",
                        }),
                        ...(cell.column.sticky === "right" && {
                          position: "sticky",
                          right: 0,
                          zIndex: 2,
                          backgroundColor: "white",
                        }),
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};