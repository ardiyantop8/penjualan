import React, { memo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableContainer,
  Paper,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { useWatch } from "react-hook-form";
import Decimal from "decimal.js";

// * Total per column (right end of each row)
const CellTotal = memo(function CellTotal({ control, columnsToSum }) {
  const values = useWatch({ control, name: columnsToSum });
  const sum = (values || []).reduce(
    (acc, val) => acc.plus(new Decimal(val || 0)),
    new Decimal(0)
  );
  return (
    <span>
      {new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(sum)}
    </span>
  );
});
CellTotal.displayName = "CellTotal";

// * Total per row (bottom end of each column)
const FooterTotal = memo(function FooterTotal({ control, data, columnId }) {
  const names = data.map((row) =>
    row.original.accessorPrefix
      ? `${row.original.accessorPrefix}_${columnId}`
      : ""
  );
  const values = useWatch({ control, name: names.filter(Boolean) });
  const total = (values || []).reduce(
    (acc, val) => acc.plus(new Decimal(val || 0)),
    new Decimal(0)
  );
  return (
    <span>
      {new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total)}
    </span>
  );
});
FooterTotal.displayName = "FooterTotal";

// * Total for all rows (grand total at the bottom)
const FooterGrandTotal = memo(function FooterGrandTotal({
  control,
  data,
  summableColumnIds,
}) {
  const allFieldNames = data.flatMap((row) => {
    const prefix = row.original.accessorPrefix;
    return prefix ? summableColumnIds.map((colId) => `${prefix}_${colId}`) : [];
  });
  const values = useWatch({ control, name: allFieldNames });
  const grandTotal = (values || []).reduce(
    (acc, val) => acc.plus(new Decimal(val || 0)),
    new Decimal(0)
  );
  return (
    <span>
      {new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(grandTotal)}
    </span>
  );
});
FooterGrandTotal.displayName = "FooterGrandTotal";

/**
 * Komponen `TableStickyYear` yang generik dan dapat dikonfigurasi.
 *
 * @param {object} props
 * @param {Array} props.columns - Definisi kolom untuk react-table. Bisa berisi nested `columns` untuk grouping.
 * - Untuk kalkulasi footer, definisikan properti `Footer` pada kolom yang relevan.
 * @param {Array} props.data - Data yang akan ditampilkan. Setiap objek data harus memiliki `accessorPrefix` unik
 * jika `showFooterTotal` atau `CellTotal` digunakan, untuk membangun nama field form.
 * @param {object} props.formMethods - Objek `methods` dari `useForm` (react-hook-form) untuk kalkulasi total.
 * @param {boolean} [props.showFooterTotal=false] - Jika `true`, footer total akan dirender.
 * @param {boolean} [props.showRowTotal=false] - Jika `true`, kolom total per baris akan dirender (harus didefinisikan di `columns`).
 * @param {React.Component} [props.EmptyComponent=null] - Komponen yang ditampilkan saat data kosong.
 * @param {string} [props.tableHeight="600px"] - Tinggi maksimum tabel.
 * @param {string} [props.tableOverflowY="auto"] - Properti CSS `overflow-y` untuk tabel.
 * @param {boolean} [props.isStickyHeader=true] - Mengaktifkan header yang sticky.
 */

const TableStickyYear = (({
  columns,
  data,
  formMethods,
  showFooterTotal = false,
  showFooterGrandTotal = false,
  footerTotalColumnIds = [],
  footerGrandTotalColumnIds = [],
  EmptyComponent = null,
  isStickyHeader = true,
  tableHeight = "600px",
  tableOverflowY = "auto",
  firstRowRef = null,
}) =>{
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
      initialState: { pageSize: 20 }, // default pageSize 20, could be overridden by pagination from parent component
    },
    useSortBy,
    usePagination
  );

  const borderStyle = "1px solid #E0E0E0";
  const shadowAndOutlineStyle = "1px solid #E0E0E0";
  const isMd = useMediaQuery("(min-width:640px)");

  const getStickyProps = (colIndex) => {
    if (isMd) {
      if (colIndex === 0)
        return {
          position: "sticky",
          left: 0,
          zIndex: 10,
          background: "#fff",
          outline: shadowAndOutlineStyle,
          outlineOffset: "-1px",
          border: borderStyle,
        };
      if (colIndex === 1)
        return {
          border: borderStyle,
          outline: shadowAndOutlineStyle,
          position: "sticky",
          zIndex: 10,
          background: "#fff",
        };
      if (colIndex === 2)
        return {
          border: borderStyle,
          position: "sticky",
          zIndex: 10,
          background: "#fff",
          outline: shadowAndOutlineStyle,
        };
      // Style for label "Total" di footer
      if (colIndex === 99)
        return {
          position: "sticky",
          left: 0,
          background: "#EAF5FF",
          border: borderStyle,
          outline: shadowAndOutlineStyle,
          outlineOffset: "-1px",
        };
    }
    return {};
  };

  const getHeaderStickyProps = (colIndex, isSecondRow = false) => {
    if (isMd) {
      if (!isSecondRow) {
        // First row (year column) sticky styles
        if (colIndex === 0)
          return {
            left: 0,
            position: "sticky",
            zIndex: 20,
            background: "#084F8C",
            outline: shadowAndOutlineStyle,
            outlineOffset: "-1px",
            border: borderStyle,
          };
        if (colIndex === 1)
          return {
            position: "sticky",
            zIndex: 20,
            background: "#084F8C",
            outline: shadowAndOutlineStyle,
            border: borderStyle,
          };
        if (colIndex === 2)
          return {
            position: "sticky",
            zIndex: 20,
            background: "#084F8C",
            outline: shadowAndOutlineStyle,
            border: borderStyle,
          };
      } else {
        // Second row (months column) no sticky styles
        return {};
      }
    }
    return {};
  };

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
    <TableContainer
      component={Paper}
      style={{
        overflowX: "auto",
        maxHeight: tableHeight,
        overflowY: tableOverflowY,
        width: "100%",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}
    >
      <Table {...getTableProps()}>
        <TableHead
          sx={{
            "& tr:first-of-type th:first-of-type": {
              borderTopLeftRadius: "10px",
            },
            "& tr:first-of-type th:last-child": {
              borderTopRightRadius: "10px",
            },
            ...(isStickyHeader && {
              position: "sticky",
              top: 0,
              zIndex: 30,
              background: "#084F8C",
            }),
          }}
          {...headerGroups[0].getHeaderGroupProps({
            style: {
              height: "auto",
              minHeight: "48px",
            },
          })}
        >
          {/* First Header Row - Columns with rowSpan and group headers */}
          <TableRow sx={{ backgroundColor: "#084F8C" }}>
            {headerGroups[0].headers.map((column, colIndex) => {
              // if nested columns, use colSpan
              if (column.columns) {
                return (
                  <TableCell
                    {...column.getHeaderProps()}
                    key={column.id || colIndex}
                    colSpan={column.colSpan || column.columns.length}
                    sx={{
                      color: "#FFFFFF",
                      border: borderStyle,
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: "12px 16px",
                      position: "sticky",
                      left: 0,
                      background: "#084F8C",
                      outline: shadowAndOutlineStyle,
                      outlineOffset: "-1px",
                      ...(column.width && { width: column.width }),
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                );
              }
              // normal columns with rowSpan
              return (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.headers?.[0]?.id || colIndex}
                  rowSpan={column.headers?.[0]?.rowSpan || 1}
                  sx={{
                    color: "#FFFFFF",
                    border: borderStyle,
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "12px 16px",
                    background: "#084F8C",
                    verticalAlign: "middle",
                    outline: shadowAndOutlineStyle,
                    outlineOffset: "-1px",
                    ...getHeaderStickyProps(colIndex, false),
                    ...(column.width && { width: column.width }),
                    ...(column.headers?.[0]?.stickyOffset && {
                      left: column.headers?.[0]?.stickyOffset,
                    }),
                  }}
                >
                  {column.headers?.[0]?.Header || column.render("Header")}
                  <span key={`sort-indicator-${column.id || colIndex}`}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon fontSize="small" />
                      ) : (
                        <ArrowUpwardIcon fontSize="small" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </TableCell>
              );
            })}
          </TableRow>

          {/* Second Header Row - Month columns */}
          <TableRow sx={{ backgroundColor: "#084F8C" }}>
            {headerGroups[1].headers
              .filter((column, colIndex) => {
                const firstGroupColumn = headerGroups[0].headers[colIndex];
                return !(
                  firstGroupColumn?.headers?.[0]?.rowSpan > 1 ||
                  firstGroupColumn?.placeholderOf?.rowSpan > 1
                );
              })
              .map((column, colIndex) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`header-row2-${column.id || colIndex}`}
                  sx={{
                    color: "#FFFFFF",
                    border: borderStyle,
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "12px 16px",
                    background: "#084F8C",
                    outline: shadowAndOutlineStyle,
                    outlineOffset: "-1px",
                    ...getHeaderStickyProps(colIndex, true),
                    ...(column.width && { width: column.width }),
                  }}
                >
                  {column.render("Header")}
                  <span key={`sort-indicator-row2-${column.id || colIndex}`}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon fontSize="small" />
                      ) : (
                        <ArrowUpwardIcon fontSize="small" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.length === 0
            ? EmptyComponent
            : rows.map((row, rowIdx) => {
                prepareRow(row);
                return (
                  <TableRow
                    {...row.getRowProps()}
                    key={row.id || rowIdx}
                    ref={rowIdx === 0 ? firstRowRef : null}
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          key={cell.column.id || index}
                          sx={{
                            border: borderStyle,
                            textAlign: cell.column.align || "left",
                            padding: "8px 12px",
                            backgroundColor:
                              cell.column.id === "total" || cell.column.disabled ? "#EDEDED" : "white",
                            fontWeight:
                              cell.column.id === "total" ? (cell.column.fontWeight || "bold") : "normal",
                            fontSize:
                              cell.column.id === "total" ? (cell.column.fontSize || "inherit") : "inherit",
                            ...getStickyProps(index),
                            ...(cell.column.width && {
                              width: cell.column.width,
                              minWidth: cell.column.width,
                              maxWidth: cell.column.width,
                            }),
                            ...(cell.column.stickyOffset && {
                              left: cell.column.stickyOffset,
                            }),
                          }}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
        </TableBody>
        {(showFooterTotal || showFooterGrandTotal) && formMethods && (
          <TableFooter
            sx={{
              backgroundColor: "#EAF5FF",
              position: "sticky",
              bottom: 0,
              zIndex: 25,
            }}
          >
            <TableRow>
              {/* Label Total sticky */}
              <TableCell
                colSpan={3}
                sx={{
                  fontWeight: 700,
                  textAlign: "left",
                  fontSize: "16px",
                  height: 24,
                  padding: "8px 16px",
                  ...getStickyProps(99),
                  backgroundColor: "#EAF5FF",
                }}
              >
                Total
              </TableCell>
              {/* Total per column */}
              {footerTotalColumnIds.map((colId) =>
                showFooterTotal ? (
                  <TableCell
                    key={colId}
                    sx={{
                      fontWeight: 700,
                      textAlign: "right",
                      border: borderStyle,
                      height: 24,
                      fontSize: "16px",
                      padding: "8px 16px",
                      boxSizing: "border-box",
                      backgroundColor: "#EAF5FF",
                    }}
                  >
                    <FooterTotal
                      control={formMethods.control}
                      data={data}
                      columnId={colId}
                    />
                  </TableCell>
                ) : (
                  <TableCell key={colId}></TableCell>
                )
              )}
              {/* Grand Total */}
              {showFooterGrandTotal && (
                <TableCell
                  sx={{
                    fontWeight: 700,
                    textAlign: "right",
                    fontSize: "16px",
                    height: 24,
                    padding: "8px 16px",
                    boxSizing: "border-box",
                    border: borderStyle,
                    backgroundColor: "#EAF5FF",
                  }}
                >
                  <FooterGrandTotal
                    control={formMethods.control}
                    data={data}
                    summableColumnIds={footerGrandTotalColumnIds}
                  />
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
});

export { TableStickyYear };
