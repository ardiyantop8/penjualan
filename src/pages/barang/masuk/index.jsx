import { Card, TableContainer, TableCell, TableRow, TablePagination, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { ButtonDefault } from '@/components/atoms/buttons/default';
import { IconAdd } from "@/components/atoms/icons/add";
import { TablePaginationActions } from '@/components/molecules/table/table-pagination-actions'
import { formatNominal } from "@/utils/formatString";
import DataTableSubHeader from '@/components/molecules/table/data-table-sub-header';
import { useRouter } from 'next/router';
import { ModalLoadingUtil } from "@/helpers/ModalLoadingUtil";
import { ModalSuccessUtil } from "@/helpers/ModalSuccessUtil";

const BarangMasuk = () => {
    const [dataNew, setDataNew] = useState([]);
    const router = useRouter();
    const [openModalJenis, setOpenModalJenis] = useState(false);
    const [formJenis, setFormJenis] = useState({
        namaJenis: '',
        deskripsi: '',
        keterangan: ''
    });
    
    const addBarang = () => {
        router.push('/barang/masuk/tambah');
    }
    
    const addJenisBarang = () => {
        setOpenModalJenis(true);
    }
    
    const handleCloseModal = () => {
        setOpenModalJenis(false);
        setFormJenis({
            namaJenis: '',
            deskripsi: '',
            keterangan: ''
        });
    }
    
    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormJenis({
            ...formJenis,
            [name]: value
        });
    }
    
    const handleSaveJenis = async () => {
        const linkCreateJenis = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=createJenisBarang"
        if (!formJenis.namaJenis.trim()) {
            alert('Nama Jenis tidak boleh kosong');
            return;
        }
        ModalLoadingUtil.showModal();
        fetch(linkCreateJenis, {
            method: "POST",
            body: JSON.stringify({
                namaJenis: formJenis.namaJenis,
                namaBranch: formJenis.namaBranch,
                aksesoris: formJenis.aksesoris
            })
        })
        .then(r => r.json())
        .then(result => {
            if (result.responseCode === '00') {
                ModalSuccessUtil.showModal('Berhasil menambahkan jenis barang');
                handleCloseModal();
            } else {
                alert(result.responseMessage);
            }
        })
        .catch(err => {
            console.error(err);
            alert('Gagal memuat jenis barang.');
        })
        .finally(() => {
            ModalLoadingUtil.hideModal();
        });
    }
    const [dataAPI, setDataAPI] = useState([]);
    const [optionJenis, setOptionJenis] = useState([]);
    const [loadingJenis, setLoadingJenis] = useState(false);
    const [filterData, setFilterData] = useState({
        pagination: {
            page: 1,
            limit: 10,
        },
        search: '',
    });

    const data = dataAPI?.data || [];

    const cellStyle = { borderLeft: '2px solid #E0E0E0', borderRight: '2px solid #E0E0E0' };
    const columnsTop = [
        { label: 'No', rowspan: 2, align: 'center', width: 60 },
        { label: 'Nama Barang', rowspan: 2, align: 'center', width: 80 },
        { label: 'Harga Modal', rowspan: 2, align: 'left', width: 140 },
        { label: 'Harga Jual', rowspan: 2, align: 'left', width: 140 },
        { label: 'Link URL', rowspan: 2, align: 'left', width: 140 },
        
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

    const linkGetBarang = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=inquiryBarangMasukSort"

    // useEffect(() => {
    //         ModalLoadingUtil.showModal();
    //         fetch(linkGetJenisBarang, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 page: 1,
    //                 rows: 20
    //             })
    //         })
    //         .then(r => r.json())
    //         .then(result => {
    //             if (result.responseCode === '00') {
    //                 setDataAPI(result.data.data.map(item => ({
    //                     label: item.namajenis,
    //                     value: item.idjenis
    //                 })));
    //             } else {
    //                 alert(result.responseMessage);
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             alert('Gagal memuat jenis barang.');
    //         })
    //         .finally(() => {
    //             setLoadingJenis(false);
    //             ModalLoadingUtil.hideModal();
    //         });
    //     },[]);

    useEffect(() => {
        ModalLoadingUtil.showModal();
        fetch(linkGetBarang, {
            method: "POST",
            body: JSON.stringify({
                page: 1,
                rows: 10
            })
        })
        .then(r => r.json())
        .then(result => {
            if (result.responseCode === '00') {
                console.log("result:", result);
                setDataAPI(result.data);
                // setDataAPI(result.data.data.map(item => ({
                //     label: item.namajenis,
                //     value: item.idjenis
                // })));
            } else {
                alert(result.responseMessage);
            }
        })
        .catch(err => {
            console.error(err);
            alert('Gagal memuat jenis barang.');
        })
        .finally(() => {
            ModalLoadingUtil.hideModal();
        });
    },[]);
    return (
        <>
            <Card className="p-4 border border-gray-300">
                <div className="flex gap-1">
                    <div className="pb-4 pl-4">
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
                    <div className="pb-4 px-2">
                        <ButtonDefault
                            sx={{
                                padding: '6px 24px',
                                borderColor: "#ED6E12"
                            }}
                            model="outline"
                            color="#ED6E12"
                            onClick={addJenisBarang}
                            className='flex items-center'
                            startIcon={<IconAdd color="#ED6E12" width={15} height={15}/>}
                        > Tambah Jenis Barang
                        </ButtonDefault>
                    </div>
                </div>
                <div className='px-4'>
                    <hr />
                </div>
                <div className="py-4">
                    <h1 className="px-4 text-2xl font-bold">Barang Masuk</h1>
                    <TableContainer  className="px-4 w-full">
                        <div className="overflow-x-auto w-full py-4">
                            {/* {viewTable()} */}
                            <DataTableSubHeader
                                sx={cellStyle}
                                data={data}
                                columnsTop={columnsTop}
                                // columnsSub={columnsSub}
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
                                            {row.idMasuk + '.'}
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
                                            {row?.namaBarang ?? '-'}
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
                                            {formatNominal(row?.hargaModal) ?? '-'}
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                borderLeft: '2px solid #E0E0E0',
                                                borderRight: '2px solid #E0E0E0',
                                                ...(3 < freezeLeftColumn && {
                                                    position: 'sticky',
                                                    left: getLeftOffset(3),
                                                    zIndex: 2,
                                                    backgroundColor: '#fff',
                                                }),
                                                minWidth: columnWidths[3],
                                            }}
                                        >
                                            {formatNominal(row?.hargaJual) ?? '-'}
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                borderLeft: '2px solid #E0E0E0',
                                                borderRight: '2px solid #E0E0E0',
                                                ...(3 < freezeLeftColumn && {
                                                    position: 'sticky',
                                                    left: getLeftOffset(3),
                                                    zIndex: 2,
                                                    backgroundColor: '#fff',
                                                }),
                                                minWidth: columnWidths[3],
                                            }}
                                        >
                                            {row?.gambarUrl ?? '-'}
                                        </TableCell>
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
                                            page={dataAPI?.page}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            SelectProps={{
                                            inputProps: { "aria-label": "rows per page" },
                                            }}
                                            labelRowsPerPage={"Jumlah Baris Tiap Halaman"}
                                            labelDisplayedRows={(props) => {
                                                if (props.count !== 0) {
                                                    return `Halaman ${dataAPI?.page} dari ${Math.ceil(dataAPI?.totalPages || 1)}`;
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
            
            {/* Modal Tambah Jenis Barang */}
            <Dialog open={openModalJenis} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>Tambah Jenis Barang</DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        label="Nama Jenis"
                        name="namaJenis"
                        value={formJenis.namaJenis}
                        onChange={handleChangeForm}
                        placeholder="Masukkan nama jenis barang"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Nama Branch"
                        name="namaBranch"
                        value={formJenis.namaBranch}
                        onChange={handleChangeForm}
                        placeholder="Masukkan nama branch"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Tipe Aksesoris"
                        name="aksesoris"
                        value={formJenis.aksesoris}
                        onChange={handleChangeForm}
                        placeholder="Masukkan jenis aksesoris"
                        margin="normal"
                        // multiline
                        // rows={3}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <ButtonDefault
                        model="outline"
                        color="#ED6E12"
                        onClick={handleCloseModal}
                        sx={{ padding: '6px 24px' }}
                    >
                        Batal
                    </ButtonDefault>
                    <ButtonDefault
                        model="fill"
                        color="#ED6E12"
                        onClick={handleSaveJenis}
                        sx={{ padding: '6px 24px' }}
                    >
                        Simpan
                    </ButtonDefault>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BarangMasuk