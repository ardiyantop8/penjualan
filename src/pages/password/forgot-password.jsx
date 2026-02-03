import Link from "next/link";

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center mb-2 text-indigo-600">
                Lupa Password 🔐
                </h1>
                <p className="text-center text-gray-500 mb-6">
                Masukkan email Anda untuk reset password
                </p>

                <form className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    Kirim Link Reset
                </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                Kembali ke{" "}
                <Link href="/login" className="text-indigo-600 font-medium">
                    Login
                </Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword