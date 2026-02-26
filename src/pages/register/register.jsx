import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import useSessionStore from '@/stores/useSessionStore';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ nama: '', email: '', tglLahir: '', password1: '', password2: '', gender: '' });
    const router = useRouter();
    const setUser = useSessionStore(state => state.setUser);

    const linkCreateAnggota = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=insertAnggota"

    const passwordsMatch = form.password1 === form.password2 && form.password1.length > 0;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = form.email ? emailRegex.test(form.email) : false;
    const canSubmit = form.nama && form.email && isEmailValid && form.password1 && form.password2 && passwordsMatch && form.gender && !loading;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        // convert date before sending
        const apiDate = form.tglLahir.replace(/-/g, '/');

        setLoading(true);
        try {
            const res = await fetch(linkCreateAnggota, {
                method: "POST",
                body: JSON.stringify({
                    nama: form.nama,
                    jenis: form.gender,
                    status: "anggota",
                    tgllahir: apiDate,
                    email: form.email,
                    password: form.password1,
                    role: "anggota"
                })
            });

            const result = await res.json();
            console.log("API Response:", result);

            if(result.responseCode === "00") {
                setUser && setUser(result.data);
                alert('Registrasi berhasil! Silakan login dengan akun Anda.');
                router.push('/login/login');
            } else {
                alert(result.responseMessage || 'Registrasi gagal');
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center mb-2 text-indigo-600">Daftar Akun 🚀</h1>
                <p className="text-center text-gray-500 mb-6">Ayo mulai upgrade style anak anda di clebee fashion</p>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <input
                        value={form.nama}
                        onChange={(e) => setForm({...form, nama: e.target.value})}
                        type="text"
                        name="nama"
                        placeholder="Nama Lengkap"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {form.email && !isEmailValid && (
                        <p className="text-sm text-red-500 mt-2">Email tidak valid</p>
                    )}

                    <input
                        value={form.tglLahir}
                        onChange={(e) => {
                            // keep only digits, limit to 8 digits (DDMMYYYY)
                            const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
                            const parts = [];
                            if (digits.length > 0) parts.push(digits.slice(0, Math.min(2, digits.length)));
                            if (digits.length > 2) parts.push(digits.slice(2, Math.min(4, digits.length)));
                            if (digits.length > 4) parts.push(digits.slice(4, 8));
                            const formatted = parts.join('-');
                            setForm({...form, tglLahir: formatted});
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        name="tglLahir"
                        placeholder="DD-MM-YYYY"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: DD-MM-YYYY (otomatis menambahkan - saat mengetik)</p>

                    {/* Gender */}
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                        <div className="flex gap-4 items-center">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Laki-laki"
                                    checked={form.gender === 'Laki-laki'}
                                    onChange={(e) => setForm({...form, gender: e.target.value})}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Laki-laki</span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Perempuan"
                                    checked={form.gender === 'Perempuan'}
                                    onChange={(e) => setForm({...form, gender: e.target.value})}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Perempuan</span>
                            </label>
                        </div>
                        {!form.gender && (
                            <p className="text-sm text-red-500 mt-2">Silakan pilih jenis kelamin</p>
                        )}
                    </div>

                    <input
                        value={form.password1}
                        onChange={(e) => setForm({...form, password1: e.target.value})}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password1"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <div>
                        <input
                            value={form.password2}
                            onChange={(e) => setForm({...form, password2: e.target.value})}
                            type={showPassword ? "text" : "password"}
                            placeholder="Konfirmasi Password"
                            name="password2"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {form.password2 && !passwordsMatch && (
                            <p className="text-sm text-red-500 mt-2">Password tidak sama</p>
                        )}
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                        /> Tampilkan password
                    </label>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`w-full ${canSubmit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} text-white py-3 rounded-lg font-semibold transition`}
                    >
                        {loading ? 'Mendaftarkan...' : 'Daftar'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">Sudah punya akun?{' '}
                    <Link href="/login/login" className="text-indigo-600 font-medium">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register