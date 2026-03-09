import React, {useEffect, useState} from 'react'
import { useRouter } from "next/router";
import useSessionStore from '@/stores/useSessionStore';
import { ModalLoadingUtil } from "@/helpers/ModalLoadingUtil";
import { ModalSuccessUtil } from "@/helpers/ModalSuccessUtil";

const homeKonsumen = () => {
    const user = useSessionStore(state => state.user);
    const router = useRouter();
    const [dataBarang, setDataBarang] = useState([]);
    const linkGetBarang = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=inquiryBarangMasukSort"

    const handleLogout = () => {
        useSessionStore.persist.clearStorage(); // hapus localStorage
        router.replace("/login/login"); // redirect ke login
    }

    useEffect(() => {
        ModalLoadingUtil.showModal();
        fetch(linkGetBarang, {
            method: "POST",
            body: JSON.stringify({
                page: 1,
                rows: 20
            })
        })
        .then(r => r.json())
        .then(result => {
            if (result.responseCode === '00') {
                console.log("Data Barang:", result?.data);
                setDataBarang(result?.data?.data);
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

    const convertDriveImage = (url) => {
        if (!url) return "https://via.placeholder.com/300x200?text=Produk";

        const match = url.match(/[-\w]{25,}/);
        if (!match) return url;

        const fileId = match[0];

        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <KonsumenNavbar /> */}

            {/* Hero Section */}
            <section className="bg-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <h2 className="text-4xl font-bold mb-4">Belanja Mudah & Cepat</h2>
                    <p className="text-lg mb-6">Temukan produk terbaik dengan harga terjangkau</p>
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100" onClick={() => router.push("/produk/produkKonsumen")}>Belanja Sekarang</button>
                </div>
            </section>

            {/* Product List */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h3 className="text-2xl font-bold mb-8 text-center">Produk Terbaru</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {dataBarang.map((product) => {
                    console.log("DATA",convertDriveImage(product?.gambarUrl));
                    return(
                        <div key={product?.idMasuk} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                        <img 
                            src={convertDriveImage(product?.gambarUrl)} 
                            alt={product.namaBarang} 
                            className="rounded-t-lg w-full h-48 object-cover bg-gray-200"
                        />
                        <div className="p-4">
                            <h4 className="font-semibold text-lg">{product.namaBarang}</h4>
                            <p className="text-indigo-600 font-bold mt-2">Rp {parseInt(product.hargaJual || 0).toLocaleString('id-ID')}</p>
                            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Beli Sekarang</button>
                        </div>
                        </div>
                    )
                })}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center">© {new Date().getFullYear()} Ardiyanto Putra @Clebee Fashion</div>
            </footer>
        </div>
    )
}

export default homeKonsumen