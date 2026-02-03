import React from 'react'
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const TemplateKanan = ({showPassword, setShowPassword}) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [form, setForm] = React.useState({
        email: "",
        password: ""
    });
    
    /* API LINK UNTUK SPREADSHEET */
    let linkLogin = "https://script.google.com/macros/s/AKfycbxeCUkng36SKv5UxyHvfN15CqGYeLLFfebVwFAWANcKQDQoLNAENIIKwB-j_dz29RxQhA/exec?action=login";
    const onSubmit = async () => {
        setLoading(true);
        const res = await fetch(linkLogin, {
            method: "POST",
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        });
        // setBtnLogin(true);

        const result = await res.json();
        setLoading(false);
        console.log("API Response:", result);
        // setBtnLogin(false);

        if(result.responseCode === "00") {
            setUser(result.data);
            // redirect ke /home
            // window.location.href = "/home";
            // router.push('/home');
            alert(result.responseMessage);
        } else {
            alert(result.responseMessage);
        }
    };

    return (
        <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-4 mb-8">
                    <div className="" onClick={() => router.push('/home/homeKonsumen')}>
                        <ArrowBackRoundedIcon className="text-indigo-600"/>
                        {/* <p>Kembali</p> */}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Login Akun
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Masuk untuk mengelola penjualan Anda
                    </p>
                </div>

                <form className="space-y-5">
                    {/* Email */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
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
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
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
    )
}

export default TemplateKanan