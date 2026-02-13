import { useState } from "react";
import Link from "next/link";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center mb-2 text-indigo-600">
                Daftar Akun 🚀
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Ayo mulai upgrade style anak anda di clebee fashion
                </p>

                <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Konfirmasi Password"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <label className="flex items-center gap-2 text-sm">
                    <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                    />
                    Tampilkan password
                </label>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    Daftar
                </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                Sudah punya akun?{" "}
                <Link href="/login/login" className="text-indigo-600 font-medium">
                    Login
                </Link>
                </p>
            </div>
        </div>
    )
}

export default Register