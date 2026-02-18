import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box
} from '@mui/material';

export default function DataTableSubHeader({
  data,
  columnsTop,
  columnsSub,
  columnsSub2, // Tambahan header tingkat 3
  renderRow,
  freezeLeftColumn = 2,
}) {
  const borderStyle = '1px solid #E0E0E0';
  const headerBg = '#01529C';
  const headerTextColor = '#FFFFFF';

  // Hitung tinggi header
  const headerHeight = 40; // Tinggi header utama
  const subHeaderHeight = 40; // Tinggi subheader
  const subHeader2Height = 35; // Tinggi subheader ke-3

  const baseCellStyle = {
    borderBottom: borderStyle,
    borderRight: borderStyle,
    borderLeft: borderStyle,
    color: headerTextColor,
    backgroundColor: headerBg,
    textAlign: 'center',
    fontSize: '14px',
    boxSizing: 'border-box',
    padding: '8px 12px',
  };

  const columnWidths = columnsTop?.map(col => col.width || 150);
  const columnWidthsSub = columnsSub?.map(col => col.width || 150);
  const columnWidthsSub2 = columnsSub2?.map(col => col.width || 150);

  const getLeftOffset = (index) => {
    return columnWidths?.slice(0, index).reduce((acc, w) => acc + w, 0);
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <TableContainer 
        component={Paper}
        sx={{
          maxHeight: 600,
          borderRadius: '16px',
        }}
      >
        <Table sx={{
          borderCollapse: 'separate',
          borderSpacing: 0,
          width: '100%',
        }}>
          {/* Gabungkan header dalam satu grup sticky */}
          <TableHead>
            {/* Header Utama - Baris 1 */}
            <TableRow sx={{
              position: 'sticky',
              top: 0,
              zIndex: 6,
            }}>
              {columnsTop.map((col, i) => (
                
                <TableCell
                  key={`top-${i}`}
                  rowSpan={col.rowspan || 1}
                  colSpan={col.colspan || 1}
                  align={col.align || 'center'}
                  sx={{
                    ...baseCellStyle,
                    ...(i < freezeLeftColumn && {
                      position: 'sticky',
                      left: getLeftOffset(i),
                      zIndex: 7,
                      textAlign: col?.align || 'center',
                    }),
                    minWidth: columnWidths[i],
                    width: columnWidths[i],
                    height: headerHeight,
                    ...(i === 0 && { borderLeft: 'none' }),
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>

            {/* Subheader - Baris 2 */}
            {columnsSub && columnsSub.length > 0 && (
              <TableRow sx={{
                position: 'sticky',
                top: headerHeight, // Tempel di bawah header utama
                zIndex: 5,
              }}>
                {columnsSub.map((col, i) => (
                  <TableCell
                    key={`sub-${i}`}
                    rowSpan={col.rowspan || 1}
                    colSpan={col.colspan || 1}
                    align={col.align || 'center'}
                    sx={{
                      ...baseCellStyle,
                      minWidth: columnWidthsSub[i],
                      width: columnWidthsSub[i],
                      height: subHeaderHeight,
                      ...(i === 0 && { borderLeft: 'none' }),
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            )}

            {/* Sub-subheader (tingkat 3) */}
            {columnsSub2?.length > 0 && (
              <TableRow sx={{
                position: 'sticky',
                top: headerHeight + subHeaderHeight, // Tempel di bawah subheader
                zIndex: 5,
              }}>
                {columnsSub2.map((col, i) => (
                  <TableCell
                    key={`sub2-${i}`}
                    align={col.align || 'center'}
                    sx={{
                      ...baseCellStyle,
                      // ...(i < freezeLeftColumn && {
                      //   position: 'sticky',
                      //   left: getLeftOffset(i),
                      //   zIndex: 6,
                      // }),
                      minWidth: columnWidthsSub2[i],
                      width: columnWidthsSub2[i],
                      height: subHeader2Height,
                      ...(i === 0 && { borderLeft: 'none' }),
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            {data?.length > 0 ? (
              data.map((row, index) =>
                renderRow(row, index, freezeLeftColumn, getLeftOffset, columnWidths)
              )
            ) : (
              <TableRow>
                <TableCell colSpan={columnsTop.length} align="center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}