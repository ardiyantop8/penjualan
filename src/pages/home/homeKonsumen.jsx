import React from 'react'
import { useRouter } from "next/router";
import useSessionStore from '@/stores/useSessionStore';

// icons for responsive navbar (Material UI)
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const homeKonsumen = () => {
    const user = useSessionStore(state => state.user);
    const router = useRouter();
    const [openUser, setOpenUser] = React.useState(false);
    const [openMobile, setOpenMobile] = React.useState(false);
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

    const handleLogout = () => {
        useSessionStore.persist.clearStorage(); // hapus localStorage
        router.replace("/login/login"); // redirect ke login
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-indigo-600">
                        Clebee Fashion
                    </h1>
                    <ul className="hidden md:flex gap-6 text-gray-600">
                        <li className="hover:text-indigo-600 cursor-pointer flex items-center">
                            <span className="md:hidden">
                                <HomeIcon className="text-lg" />
                            </span>
                            <span className="hidden md:block">Home</span>
                        </li>
                        <li className="hover:text-indigo-600 cursor-pointer flex items-center">
                            <span className="md:hidden">
                                <CategoryIcon className="text-lg" />
                            </span>
                            <span className="hidden md:block">Produk</span>
                        </li>
                        <li className="hover:text-indigo-600 cursor-pointer flex items-center">
                            <span className="md:hidden">
                                <PhoneIcon className="text-lg" />
                            </span>
                            <span className="hidden md:block">Kontak</span>
                        </li>
                        <li className="hover:text-indigo-600 cursor-pointer flex items-center">
                            <span className="md:hidden">
                                <ShoppingCartIcon className="text-lg" />
                            </span>
                            <span className="hidden md:block">Keranjang</span>
                        </li>
                        {user ? (
                            <li className="relative">
                                <button
                                    onClick={() => setOpenUser(!openUser)}
                                    className="hover:text-indigo-600 cursor-pointer"
                                >
                                    Profile
                                </button>

                                {openUser && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li
                                                className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                                                onClick={() => router.push("/profile")}
                                            > Lihat Profil
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer"
                                                onClick={handleLogout}
                                            > Keluar
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => router.push("/login/login")}>Login</li>
                        )}
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-2xl text-gray-700"
                        onClick={() => setOpenMobile(!openMobile)}
                        >
                        {openMobile ? <CloseIcon /> : <MenuIcon />}
                    </button>

                    {/* ===== MOBILE MENU ===== */}
                    {openMobile && (
                        <div className="md:hidden absolute right-1 top-5 mt-8 w-56 bg-white border rounded-xl shadow-lg z-50">
                        <ul className="flex flex-col text-gray-700">
                            <li
                                className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer"
                                onClick={() => {
                                    router.push("/");
                                    setOpenMobile(false);
                                }}
                            >
                                <HomeIcon />Home
                            </li>

                            <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer">
                                <CategoryIcon />Produk
                            </li>

                            <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer">
                                <PhoneIcon />Kontak
                            </li>

                            <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer">
                                <ShoppingCartIcon />Keranjang
                            </li>

                            {user ? (
                            <>
                                <li
                                    className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer"
                                    onClick={() => router.push("/profile")}
                                >
                                    <AccountCircleIcon /> Lihat Profil
                                </li>
                                <li
                                    className="px-4 py-3 hover:bg-red-50 text-red-500 flex items-center gap-3 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <LogoutIcon /> Keluar
                                </li>
                            </>
                            ) : (
                            <li
                                className="px-4 py-3 hover:bg-indigo-50 cursor-pointer"
                                onClick={() => router.push("/login/login")}
                            >
                                Login
                            </li>
                            )}
                        </ul>
                        </div>
                    )}
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