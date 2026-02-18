import { Card, TableContainer, TableCell, TableRow, TablePagination, Box } from '@mui/material'
import React from 'react'
import { ButtonDefault } from '@/components/atoms/buttons/default';
import { IconAdd } from "@/components/atoms/icons/add";
import { TablePaginationActions } from '@/components/molecules/table/table-pagination-actions'
import { formatNominal } from "@/utils/formatString";
import DataTableSubHeader from '@/components/molecules/table/data-table-sub-header';
import { useRouter } from 'next/router';

const BarangMasuk = () => {
    const router = useRouter();
    const addBarang = () => {
        router.push('/barang/masuk/tambah');
    }

    const data = [
        {
            no: 1,
            region_code: 'RO-001',
            region_desc: 'Regional Office 1',
            status_kunjungan: {
                plan: 10,
                done: 8,
                cancelled: 2,
            },
            total_kunjungan: 10,
            detail_kunjungan_pembinaan: {
                debitur: 5,
                outstanding: 5000000,
            },
        },
        {
            no: 2,
            region_code: 'RO-002',
            region_desc: 'Regional Office 2',
            status_kunjungan: {
                plan: 15,
                done: 12,
                cancelled: 3,
            },
            total_kunjungan: 15,
            detail_kunjungan_pembinaan: {
                debitur: 7,
                outstanding: 7500000,
            },
        },
    ];

    const cellStyle = { borderLeft: '2px solid #E0E0E0', borderRight: '2px solid #E0E0E0' };
    const columnsTop = [
        { label: 'No', rowspan: 2, align: 'center', width: 60 },
        { label: 'Kode', rowspan: 2, align: 'center', width: 80 },
        { label: 'Regional Office', rowspan: 2, align: 'left', width: 140 },
        { label: 'Status Aktivitas', colspan: 3 },  
        { label: 'Total Aktivitas', rowspan: 2, align: 'center', width: 100 },
        { label: 'Detail Aktivitas Selesai Dikunjungi', colspan: 6 },
    ];

    const columnsSub =  [
        { label: 'Rencana', width: 120 }, { label: 'Selesai', width: 120 }, { label: 'Batal', width: 120 },
        { label: 'Debitur', width: 120 }, { label: 'Outstanding (Rp)', width: 190 },
    ];

    const handlePageChange = (value) => {
        setFilterData({
            ...filterData,
            pagination: {
                ...filterData.pagination,
                page: value,
            },
        });
    };

    const handleChangeRowsPerPage = (event) => {
        setFilterData({
            ...filterData,
            pagination: {
                ...filterData.pagination,
                limit: event.target.value,
                page:1
            },
        });
    };
    return (
        <>
            <Card className="p-4 border border-gray-300">
                <div className="pb-4 px-4">
                    <ButtonDefault
                        sx={{
                            padding: '6px 24px',
                            borderColor: "#ED6E12"
                        }}
                        model="outline"
                        color="#ED6E12"
                        onClick={addBarang}
                        className='flex items-center'
                        startIcon={<IconAdd color="#ED6E12" width={15} height={15}/>}
                    > Tambah Barang Masuk
                    </ButtonDefault>
                    
                </div>
                <hr />
                <div className="py-4">
                    <h1 className="px-4 text-2xl font-bold">Barang Masuk</h1>
                    <TableContainer  className="px-4 w-full">
                        <div className="overflow-x-auto w-full py-4">
                            {/* {viewTable()} */}
                            <DataTableSubHeader
                                sx={cellStyle}
                                data={data}
                                columnsTop={columnsTop}
                                columnsSub={columnsSub}
                                isStickyHeader={true}
                                freezeLeftColumn={3}
                                renderRow={(row, index, freezeLeftColumn, getLeftOffset, columnWidths) => (
                                    <TableRow key={index}>
                                        <TableCell 
                                            sx={{
                                                borderLeft: '2px solid #E0E0E0',
                                                borderRight: '2px solid #E0E0E0',
                                                ...(0 < freezeLeftColumn && {
                                                    position: 'sticky',
                                                    left: getLeftOffset(0),
                                                    zIndex: 2,
                                                    backgroundColor: '#fff',
                                                }),
                                                minWidth: columnWidths[0],
                                            }}
                                        >
                                            {/* {(filterData.pagination.page - 1) * 
                                                filterData.pagination.limit +
                                                row.no +
                                                '.'
                                            } */}
                                            {row.no + '.'}
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                borderLeft: '2px solid #E0E0E0',
                                                borderRight: '2px solid #E0E0E0',
                                                ...(1 < freezeLeftColumn && {
                                                    position: 'sticky',
                                                    left: getLeftOffset(1),
                                                    zIndex: 2,
                                                    backgroundColor: '#fff',
                                                }),
                                                minWidth: columnWidths[1],
                                            }}
                                        >
                                            {row.region_code ?? '-'}
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                borderLeft: '2px solid #E0E0E0',
                                                borderRight: '2px solid #E0E0E0',
                                                ...(2 < freezeLeftColumn && {
                                                    position: 'sticky',
                                                    left: getLeftOffset(2),
                                                    zIndex: 2,
                                                    backgroundColor: '#fff',
                                                }),
                                                minWidth: columnWidths[2],
                                            }}
                                        >
                                            {formatNominal(row?.region_desc) || '-'}
                                        </TableCell>
                                        <TableCell sx={cellStyle} align="center">{formatNominal(row?.status_kunjungan?.plan) || 0}</TableCell>
                                        <TableCell sx={cellStyle} align="center">{formatNominal(row?.status_kunjungan?.done) || 0}</TableCell>
                                        <TableCell sx={cellStyle} align="center">{formatNominal(row?.status_kunjungan?.cancelled) || 0}</TableCell>
                                        <TableCell sx={cellStyle} align="center">{formatNominal(row?.total_kunjungan) || 0}</TableCell>
                                        <TableCell sx={cellStyle} align="center">{formatNominal(row?.detail_kunjungan_pembinaan?.debitur) || 0}</TableCell>
                                        <TableCell sx={cellStyle} align="right">{formatNominal(row?.detail_kunjungan_pembinaan?.outstanding) || 0}</TableCell>
                                    </TableRow>
                                )}
                            />
                            <Box
                                sx={{
                                background: "#ffffff",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                position: "sticky",
                                left: 0,
                                bottom: 0,
                                width: "100%",
                                }}
                            >
                                {data?.length > 0 && (
                                <>
                                    {/* <div className="text-[13px]">{`Menampilkan ${data?.length || 0} dari ${dataCount?.[keyCount] || 0} data`}</div> */}
                                    <div className="text-[13px]">{`Menampilkan ${data?.length || 0} dari ${data.length || 0} data`}</div>
                                        <TablePagination
                                            component="div"
                                            rowsPerPageOptions={[10, 20, 50]}
                                            count={Math.ceil(data.length )}
                                            rowsPerPage={10}
                                            page={1}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            SelectProps={{
                                            inputProps: { "aria-label": "rows per page" },
                                            }}
                                            labelRowsPerPage={"Jumlah Baris Tiap Halaman"}
                                            labelDisplayedRows={(props) => {
                                                if (props.count !== 0) {
                                                    return `Halaman ${props?.page} dari ${Math.ceil(data.length / props.rowsPerPage)}`;
                                                }
                                            }}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                </>
                                )}
                            </Box>
                        </div>
                    </TableContainer>
                </div>
            </Card>
        </>
    )
}

export default BarangMasuk