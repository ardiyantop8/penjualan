import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import useSessionStore from '@/stores/useSessionStore';

import { useRouter } from 'next/router';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";

const TemplateKanan = ({showPassword, setShowPassword}) => {
    const setUser = useSessionStore(state => state.setUser);
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [form, setForm] = React.useState({
        email: "",
        password: ""
    });
    const clearUser = useSessionStore(state => state.clearUser);

    /* API LINK UNTUK SPREADSHEET */
    let linkLogin = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=login";

    const onSubmit = async () => {
        setLoading(true);
        const res = await fetch(linkLogin, {
            method: "POST",
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        });

        const result = await res.json();
        setLoading(false);
        console.log("API Response:", result);

        if(result.responseCode === "00") {
            console.log("RESULT DATA:", result);
            setUser(result.data);
            if (result?.data?.role == "admin") {
                router.push('/home/homeAdmin');
            } else {
                router.push('/home/homeKonsumen')
            }
        } else {
            alert(result.responseMessage);
        }
    };

    const backTohomeConsumen = () => {
        clearUser(); // bersihkan state zustand
        useSessionStore.persist.clearStorage(); // hapus localStorage
        router.replace('/home/homeKonsumen');
    }
    return (
        <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-4 mb-8">
                    <div onClick={backTohomeConsumen}>
                        <ArrowBackRoundedIcon className="text-indigo-600"/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Login Akun
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Masuk untuk mengelola penjualan Anda
                    </p>
                </div>

                <form className="space-y-5" onSubmit={onSubmit}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            placeholder="email@company.com"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-indigo-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Lupa Password */}
                    <div className="flex justify-end">
                        <Link
                            href="../password/forgot-password"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Lupa password?
                        </Link>
                    </div>

                    {/* Button Login */}
                    <button
                        // type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
                        disabled={loading}
                        onClick={onSubmit}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="text-sm text-gray-400">atau</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Daftar */}
                <p className="text-sm text-center text-gray-600">
                    Belum punya akun?{" "}
                    <Link
                        href="../register/register"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Daftar sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default TemplateKanan;