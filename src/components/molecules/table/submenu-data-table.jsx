import React from "react";
import { useTable, usePagination, useExpanded } from "react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const SubmenuDataTable = ({ columns, data, limitNo, pageNo }) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        manualSortBy: true,
        limitNo,
        pageNo,
      },
      useExpanded,
      usePagination
    );

  const borderStyle = "1px solid #E0E0E0";

  return (
    <Table {...getTableProps()} sx={{ borderCollapse: "collapse" }}>
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
                className="text-base"
                sx={{
                  color: "#FFFFFF",
                  borderLeft: index === 0 ? "none" : borderStyle,
                  borderRight:
                    index === headerGroup.headers.length - 1
                      ? "none"
                      : borderStyle,
                  borderBottom: borderStyle,
                }}
                {...column.getHeaderProps({
                  style: {
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "13px",
                    width: column.width,
                  },
                })}
              >
                <strong>{column.render("Header")}</strong>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const hasSubmenu =
            Array.isArray(row.original.sub_menu) &&
            row.original.sub_menu.length > 0;
          const isSubMenuLastRow =
            hasSubmenu && row.index === row.original.sub_menu.length - 1;
          return (
            <React.Fragment key={row.getRowProps().key}>
              <TableRow>
                {row.cells.map((cell, index) => {
                  return (
                    <TableCell
                      key={index}
                      {...cell.getCellProps({
                        style: {
                          padding: "8px 12px",
                          textAlign: cell.column.align,
                          borderLeft: borderStyle,
                          borderRight: borderStyle,
                          borderTop: borderStyle,
                          borderBottom:
                            hasSubmenu &&
                            (cell.column.accessor === "no" ||
                              cell.column.accessor === "menu")
                              ? "none"
                              : "inherit",
                        },
                      })}
                    >
                      <span>{cell.render("Cell")}</span>
                    </TableCell>
                  );
                })}
              </TableRow>
              {hasSubmenu
                ? row.original.sub_menu.map((sub_menu, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.accessor}
                          style={{
                            padding: "8px 12px",
                            textAlign: column.align,
                            borderLeft: borderStyle,
                            borderRight: borderStyle,
                            borderTop:
                              column.accessor !== "no" &&
                              column.accessor !== "menu"
                                ? borderStyle
                                : "none",
                            borderBottom:
                              isSubMenuLastRow &&
                              (column.accessor === "no" ||
                                column.accessor === "menu")
                                ? borderStyle
                                : "none",
                          }}
                        >
                          {sub_menu[column.accessor]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : null}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};
