import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { IconListDocument } from "@/components/atoms/icons/list-document";
import { FilterAccordion } from '@/components/atoms/accordion/filter-accordion';
import { snakeToCamelWithSpace } from '@/utils/convertSnakeToCamelWithSpace';

export default function LogRiwayatTable({ dataLog = null }) {
    const convertDataToLowercase = (text) => {
        return text.charAt(0).toLowerCase() + text.slice(1);
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()];
        const year = date.getFullYear();
        const hour = `0${date.getHours()}`.slice(-2);
        const minute = `0${date.getMinutes()}`.slice(-2);
        return `${day} ${month} ${year} - ${hour}:${minute}`;
    }
    return (
        <div>
            <div className="">
                <FilterAccordion
                    isClose={true}
                    colorText="#000"
                    customHeader="white"
                    title={"Log Riwayat MAB"}
                    icon={<IconListDocument color="#084F8C" />}
                >
                    <div className="max-h-[400px] overflow-y-scroll">
                        <Table sx={{ borderCollapse: "collapse", width: "100%" }}>
                            <TableHead
                                sx={{
                                    "& th:first-of-type": {
                                        borderTopLeftRadius: "10px",
                                    },
                                    "& th:last-child": {
                                        borderTopRightRadius: "10px",
                                    },
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 2,
                                    backgroundColor: "white"
                                }}
                            >
                                <TableRow
                                    sx={{
                                        backgroundColor: "#00529C",
                                    }}
                                    className="divide-x divide-gray-200"
                                >
                                    <TableCell
                                        sx={{
                                            borderTopLeftRadius: "10px",
                                            color: "#FFFFFF",
                                            textAlign: "center",
                                            fontSize: "14px",
                                            width: "20%"
                                        }}
                                    >Waktu</TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#FFFFFF",
                                            borderLeft: "2px solid #E0E0E0",
                                            borderRight: "2px solid #E0E0E0",
                                            borderBottom: "2px solid #E0E0E0",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            width: "25%"
                                        }}
                                    >Status</TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#FFFFFF",
                                            borderLeft: "2px solid #E0E0E0",
                                            borderRight: "2px solid #E0E0E0",
                                            borderBottom: "2px solid #E0E0E0",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            width: "25%"
                                        }}
                                    >Nama</TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#FFFFFF",
                                            borderLeft: "2px solid #E0E0E0",
                                            borderRight: "2px solid #E0E0E0",
                                            borderBottom: "2px solid #E0E0E0",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            width: "30%"
                                        }}
                                    >Komentar</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                dataLog && (
                                    <TableBody>
                                        {
                                            dataLog?.map((data, index) => (
                                                <TableRow
                                                    key={index}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            borderLeft: "2px solid #E0E0E0",
                                                            borderRight: "2px solid #E0E0E0",
                                                            borderBottom: "2px solid #E0E0E0",
                                                            background: data?.aksi === "kirim" || data?.aksi === "approve" || data?.aksi === "disposisi" ? '#EAF5FF' : data?.aksi === "setujui" ? '#C6F7D0' : '#FFEAEA',
                                                            textAlign: "left",
                                                            fontSize: "16px"
                                                        }}
                                                    >{formatDateTime(data?.upddate)}</TableCell>
                                                    <TableCell
                                                        sx={{
                                                            borderLeft: "2px solid #E0E0E0",
                                                            borderRight: "2px solid #E0E0E0",
                                                            borderBottom: "2px solid #E0E0E0",
                                                            background: data?.aksi === "kirim" || data?.aksi === "approve" || data?.aksi === "disposisi" ? '#EAF5FF' : data?.aksi === "setujui" ? '#C6F7D0' : '#FFEAEA',
                                                            textAlign: "left",
                                                            fontSize: "16px"
                                                        }}
                                                    >{data?.aksi === "kirim" || data?.aksi === "approve" || data?.aksi === "disposisi" ? `${snakeToCamelWithSpace(data?.role)} telah melakukan ${data?.aksi} MAB` : data?.aksi == "setujui" ? `Disetujui oleh ${snakeToCamelWithSpace(data?.role)}` : data?.aksi == "Ditolak" ? `Prakarsa Ditolak oleh Pemutus (${snakeToCamelWithSpace(data?.role)})` : `Telah di${convertDataToLowercase(data?.aksi)} oleh ${snakeToCamelWithSpace(data?.role)}`}</TableCell>
                                                    <TableCell
                                                        sx={{
                                                            borderLeft: "2px solid #E0E0E0",
                                                            borderRight: "2px solid #E0E0E0",
                                                            borderBottom: "2px solid #E0E0E0",
                                                            background: data?.aksi === "kirim" || data?.aksi === "approve" || data?.aksi === "disposisi" ? '#EAF5FF' : data?.aksi === "setujui" ? '#C6F7D0' : '#FFEAEA',
                                                            textAlign: "left",
                                                            fontSize: "16px"
                                                        }}
                                                    >{`${data?.nama} - ${data?.pn}`}</TableCell>
                                                    <TableCell
                                                        sx={{
                                                            borderLeft: "2px solid #E0E0E0",
                                                            borderRight: "2px solid #E0E0E0",
                                                            borderBottom: "2px solid #E0E0E0",
                                                            background: data?.aksi === "kirim" || data?.aksi === "approve" || data?.aksi === "disposisi" ? '#EAF5FF' : data?.aksi === "setujui" ? '#C6F7D0' : '#FFEAEA',
                                                            textAlign: "left",
                                                            fontSize: "16px"
                                                        }}
                                                    >{data?.komentar}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                )
                            }
                            {
                                dataLog === null && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                sx={{
                                                    borderLeft: "2px solid #E0E0E0",
                                                    borderRight: "2px solid #E0E0E0",
                                                    borderBottom: "2px solid #E0E0E0",
                                                    textAlign: "center",
                                                    fontSize: "16px"
                                                }}
                                            >Belum Ada Riwayat MAB</TableCell>
                                        </TableRow>
                                    </TableBody>
                                )
                            }
                        </Table>
                    </div>
                </FilterAccordion>
            </div>
        </div>
    )
}
