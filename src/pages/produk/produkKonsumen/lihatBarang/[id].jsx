import { Button, Card } from "@mui/material";
import React, {useEffect, useState} from 'react'
import { useRouter } from "next/router";
import useSessionStore from '@/stores/useSessionStore';
import { ModalLoadingUtil } from "@/helpers/ModalLoadingUtil";
import { ModalSuccessUtil } from "@/helpers/ModalSuccessUtil";
import { ModalErrorUtil } from "@/helpers/ModalErrorUtil";
import { convertDriveImage } from "@/utils/imageHelper";
import barangService from '@/services/barangService';
import { formatHarga } from "@/helpers/format";

export default function DetailProduk() {
const user = useSessionStore(state => state?.user);
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const tambahQty = () => setQty(qty + 1);
    const kurangQty = () => qty > 1 && setQty(qty - 1);

    useEffect(() => {
        if (!router.query.id) return;
        ModalLoadingUtil.showModal();
        Promise.all([
            barangService.getBarangMasuk({ idBarang: router.query.id }),
            barangService.getDetailBarang(router.query.id)
        ])
        .then(([barangRes, detailRes]) => {
            console.log("detailRes:",detailRes);
            if (barangRes.responseCode == '00') {
                setProduct(barangRes?.data?.data?.[0] || null);
            } else {
                ModalErrorUtil.showModal(barangRes.responseMessage ?? "Ada kesalahan saat menyimpan data", () => {
                    console.log("User clicked OK");
                });
            }

            if (detailRes.responseCode == '00') {
                setDetailProduct(detailRes?.data?.data || []);
            } else {
                ModalErrorUtil.showModal(detailRes.responseMessage ?? "Ada kesalahan saat menyimpan data", () => {
                    // console.log("User clicked OK");
                });
            }
        })
        .catch(err => {
            console.error(err);
            ModalErrorUtil.showModal(err ?? "Gagal memuat data", () => {
                // console.log("User clicked OK");
            });
        })
        .finally(() => {
            ModalLoadingUtil.hideModal();
        });

    }, [router.query.id]);

    const renderStars = (rating) => {
        const stars = [];
        const value = rating || 0; // jika null / undefined -> 0

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= value ? "#FFC107" : "#E4E5E9" }}>
                    ★
                </span>
            );
        }

        return stars;
    };

    const addToCart = () => {
        // ModalLoadingUtil.showModal();
        // barangService.addCart(user.idanggota, product?.idBarang, qty, new Date(), 'Aktif')
        // .then(result => {
        //     if (result.responseCode === '00') {
        //         // setDataBarang(result?.data?.data || []);
        //         ModalSuccessUtil.showModal(result.responseMessage ?? 'Produk berhasil ditambahkan ke keranjang.');
        //     } else {
        //         ModalErrorUtil.showModal(result.responseMessage ?? "Gagal menambahkan produk ke keranjang.", () => {});
        //     }
        // })
        // .catch(err => {
        //     console.error(err);
        //     ModalErrorUtil.showModal("Gagal memuat barang.", () => {});
        // })
        // .finally(() => {
        //     ModalLoadingUtil.hideModal();
        // });
        ModalLoadingUtil.showModal();
        barangService.addCart(
            user.idanggota,
            product?.idBarang,
            qty,
            new Date(),
            'Aktif'
        )
        .then(result => {
            ModalLoadingUtil.hideModal();
            if (result.responseCode === '00') {
                ModalSuccessUtil.showModal(
                    result.responseMessage ?? 'Produk berhasil ditambahkan ke keranjang.'
                );
            } else {
                ModalErrorUtil.showModal(
                    result.responseMessage ?? "Gagal menambahkan produk ke keranjang."
                );
            }
        })
        .catch(err => {
            ModalLoadingUtil.hideModal();
            console.error(err);
            ModalErrorUtil.showModal("Gagal memuat barang.");
        });
    }
    

    if (!product) {
        return <p className="p-10">Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* GAMBAR PRODUK */}
                    <div>
                        <img
                            src={convertDriveImage(product?.gambarUrl)}
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    {/* INFO PRODUK */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">{product?.namaBarang}</h1>
                        <p className="text-3xl font-bold text-indigo-600">
                            {formatHarga(product?.hargaJual)}
                        </p>
                        <p className="text-gray-500">Stok : {product?.stok}</p>
                        {/* Rating */}
                        <div style={{ fontSize: "18px" }}>
                            {renderStars(detailProduct?.[0]?.totalRating || 0)}
                            <span style={{ marginLeft: "6px", color: "#666" }}>
                                ({detailProduct?.[0]?.totalRating || 0})
                            </span>
                        </div>

                        {/* Jumlah pembeli */}
                        <div style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>
                            🛒 {detailProduct?.[0]?.jmlhPenjualan || 0} Terjual
                        </div>

                        {/* QTY */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={kurangQty}
                                className="border px-3 py-1 rounded"
                            > -
                            </button>
                            <span className="font-semibold">{qty}</span>
                            <button
                                onClick={tambahQty}
                                className="border px-3 py-1 rounded"
                            > +
                            </button>
                        </div>
                        {/* BUTTON */}
                        <div className="flex gap-3 mt-4">

                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={addToCart}
                                disabled={user ? false : true}
                            > Tambah ke Keranjang
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={user ? false : true}
                            > Beli Sekarang
                            </Button>
                        </div>
                        {/* Buat validasi user harus login */}
                        {!user && (
                            <p className="text-xs text-red-500">
                                Silakan login untuk melakukan pembelian
                            </p>
                        )}
                    </div>
                </div>
                {/* DESKRIPSI */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-3">
                        Deskripsi Produk
                    </h2>
                    <div className="rounded-lg">
                        {detailProduct?.[0]?.detail}
                    </div>
                </div>
            </Card>
        </div>
    );
}