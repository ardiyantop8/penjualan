import { Button } from "@mui/material";
import React, {useEffect, useState} from 'react'
import { useRouter } from "next/router";
import useSessionStore from '@/stores/useSessionStore';
import { ModalLoadingUtil } from "@/helpers/ModalLoadingUtil";
import { ModalSuccessUtil } from "@/helpers/ModalSuccessUtil";
import { convertDriveImage } from "@/utils/imageHelper";
import barangService from '@/services/barangService';
import { formatHarga } from "@/helpers/format";

export default function DetailProduk() {

    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);

    const tambahQty = () => setQty(qty + 1);
    const kurangQty = () => qty > 1 && setQty(qty - 1);

    useEffect(() => {

        if (!router.query.id) return;
        ModalLoadingUtil.showModal();
        barangService.getBarangMasuk({ idBarang: router.query.id })
        .then(result => {
            if (result.responseCode === '00') {
                setProduct(result?.data?.data?.[0] || null);
            } else {
                alert(result.responseMessage);
            }
        })
        .catch(err => {
            console.error(err);
            alert("Gagal memuat detail barang.");
        })
        .finally(() => {
            ModalLoadingUtil.hideModal();
        });
    }, [router.query.id]);

    if (!product) {
        return <p className="p-10">Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

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

                    <h1 className="text-2xl font-bold text-gray-800">
                        {product?.namaBarang}
                    </h1>

                    <p className="text-3xl font-bold text-indigo-600">
                        {formatHarga(product?.hargaJual)}
                    </p>

                    <p className="text-gray-500">
                        Stok : {product?.stok}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={kurangQty}
                            className="border px-3 py-1 rounded"
                        >
                            -
                        </button>

                        <span className="font-semibold">
                            {qty}
                        </span>

                        <button
                            onClick={tambahQty}
                            className="border px-3 py-1 rounded"
                        >
                            +
                        </button>

                    </div>

                    {/* BUTTON */}
                    <div className="flex gap-3 mt-4">

                        <Button
                            variant="outlined"
                            color="primary"
                        >
                            Tambah ke Keranjang
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Beli Sekarang
                        </Button>

                    </div>
                </div>
            </div>

            {/* DESKRIPSI */}
            <div className="mt-10">

                <h2 className="text-xl font-semibold mb-3">
                    Deskripsi Produk
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                    {product?.desc}
                </div>

            </div>

        </div>
    );
}