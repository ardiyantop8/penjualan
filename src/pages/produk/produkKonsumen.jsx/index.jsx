import React from 'react'
import Link from 'next/link'

const ProdukPage = () => {
  const products = [
    { id: 1, name: 'Sepatu Sneakers', price: 'Rp 350.000', image: 'https://via.placeholder.com/400x300', desc: 'Nyaman untuk sehari-hari' },
    { id: 2, name: 'Jaket Hoodie', price: 'Rp 250.000', image: 'https://via.placeholder.com/400x300', desc: 'Hangat dan stylish' },
    { id: 3, name: 'Tas Ransel', price: 'Rp 400.000', image: 'https://via.placeholder.com/400x300', desc: 'Cocok untuk aktivitas outdoor' },
    { id: 4, name: 'Kemeja Katun', price: 'Rp 180.000', image: 'https://via.placeholder.com/400x300', desc: 'Ringan dan adem' },
    { id: 5, name: 'Topi Trucker', price: 'Rp 75.000', image: 'https://via.placeholder.com/400x300', desc: 'Pelindung matahari' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <KonsumenNavbar /> */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Produk</h1>
          <Link href="/" className="text-indigo-600 hover:underline">Kembali ke Beranda</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <Link href={`/produk/${p.id}`}>
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-indigo-600 font-bold mt-2">{p.price}</p>
                <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/produk/${p.id}`} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Lihat</Link>
                  <button className="px-4 py-2 border rounded">Tambah</button>
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
