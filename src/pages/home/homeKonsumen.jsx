import React from 'react'
import { useRouter } from "next/router";

const homeKonsumen = () => {
    const router = useRouter();
    const products = [
        {
        id: 1,
        name: "Sepatu Sneakers",
        price: "Rp 350.000",
        image: "https://via.placeholder.com/300"
        },
        {
        id: 2,
        name: "Jaket Hoodie",
        price: "Rp 250.000",
        image: "https://via.placeholder.com/300"
        },
        {
        id: 3,
        name: "Tas Ransel",
        price: "Rp 400.000",
        image: "https://via.placeholder.com/300"
        }
    ];
    const login = () => {

    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-indigo-600">
                    Clebee Fashion
                </h1>
                <ul className="flex gap-6 text-gray-600">
                    <li className="hover:text-indigo-600 cursor-pointer">Home</li>
                    <li className="hover:text-indigo-600 cursor-pointer">Produk</li>
                    <li className="hover:text-indigo-600 cursor-pointer">Kontak</li>
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => router.push("/login/login")}>Login</li>
                </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Belanja Mudah & Cepat
                    </h2>
                    <p className="text-lg mb-6">
                        Temukan produk terbaik dengan harga terjangkau
                    </p>
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        Mulai Belanja
                    </button>
                </div>
            </section>

            {/* Product List */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h3 className="text-2xl font-bold mb-8 text-center">
                Produk Terbaru
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                    key={product.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition"
                    >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-t-lg"
                    />
                    <div className="p-4">
                        <h4 className="font-semibold text-lg">
                        {product.name}
                        </h4>
                        <p className="text-indigo-600 font-bold mt-2">
                        {product.price}
                        </p>
                        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                        Beli Sekarang
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center">
                © {new Date().getFullYear()} Ardiyanto Putra @Clebee Fashion
                </div>
            </footer>
        </div>
    )
}

export default homeKonsumen