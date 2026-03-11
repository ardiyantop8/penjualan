import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { useRouter } from "next/router";
import useSessionStore from '@/stores/useSessionStore';
import { ModalLoadingUtil } from "@/helpers/ModalLoadingUtil";
import { ModalSuccessUtil } from "@/helpers/ModalSuccessUtil";
import { convertDriveImage } from "@/utils/imageHelper";
import barangService from '@/services/barangService';
import { formatHarga } from "@/helpers/format";

const ProdukPage = () => {
  const user = useSessionStore(state => state.user);
  const router = useRouter();
  const [dataBarang, setDataBarang] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    ModalLoadingUtil.showModal();
    barangService.getBarangMasuk(1, 20)
      .then(result => {
        if (result.responseCode === '00') {
          setDataBarang(result?.data?.data || []);
        } else {
          alert(result.responseMessage);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Gagal memuat barang.');
      })
      .finally(() => {
        ModalLoadingUtil.hideModal();
      });
  },[]);

  const handleOpenDetail = (product) => {
    router.push(`/produk/produkKonsumen/lihatBarang/${product.idBarang}`);
  };

  const addToCardt = (id) => {
    alert(`Tambah ke keranjang: ${id}`);
  }
  const dataDetail = [
    {
      title: "Nama Barang",
      value: selectedProduct?.namaBarang || '-',
    },
    {
      title: "Harga Jual",
      value: selectedProduct?.hargaJual || '-',
    },
    {
      title: "Stok",
      value: selectedProduct?.stok || '-',
    },
    {
      title: "Status",
      value: selectedProduct?.status || '-',
    },
  ];
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <KonsumenNavbar /> */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Produk</h1>
          <Link href="/" className="text-indigo-600 hover:underline">Kembali ke Beranda</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dataBarang.map((p) => (
            <div key={p.idMasuk} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img 
                src={convertDriveImage(p.gambarUrl)} 
                alt={p.namaBarang} 
                className="w-full h-48 object-cover cursor-pointer" 
                onClick={() => handleOpenDetail(p)}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.namaBarang}</h3>
                <p className="text-indigo-600 font-bold mt-2">{formatHarga(p.hargaJual)}</p>
                <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => handleOpenDetail(p)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Lihat
                  </button>
                  <button onClick={() => addToCardt(p.idMasuk)} className="px-4 py-2 border rounded">Tambah</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProdukPage
