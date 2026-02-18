import React from "react";
import { useTable } from "react-table";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";

export const HeadlessTable = ({
  columns,
  data,
  className,
  sxBody,
  EmptyComponent = null,
}) => {
  const { getTableProps, getTableBodyProps, prepareRow, rows } = useTable({
    columns,
    data,
  });

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

  const renderCellContent = (cell) => {
    if (Array.isArray(cell.value)) {
      return (
        <Table>
          <TableBody>
            {cell.value.map((item, subIndex) => (
              <TableRow
                key={subIndex}
                style={{
                  border: borderStyle,
                }}
              >
                <TableCell
                  style={{
                    border: borderStyle,
                  }}
                >
                  {item.subKey}
                </TableCell>
                <TableCell style={{}}>{item.subValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    return cell.render("Cell");
  };

  return (
    <div className={className}>
      <Table {...getTableProps()}>
        <TableBody
          {...getTableBodyProps({
            style: {
              ...sxBody,
            },
          })}
        >
          {rows.length === 0
            ? EmptyComponent
            : rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow key={row.getRowProps().key}>
                    {row.cells.map((cell, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          border: cell.row.original.border ?? borderStyle,
                          padding:
                            cell.column.padding ??
                            cell.row.original.padding ??
                            "8px 12px",
                        }}
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            maxWidth: cell.column.maxWidth,
                            width: cell.column.width,
                            textAlign: cell.column.align ?? "left",
                            ...cell.column.style,
                          },
                        })}
                      >
                        {renderCellContent(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
};
