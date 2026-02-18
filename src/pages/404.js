import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>

        <p className="mt-4 text-xl font-semibold text-gray-800">
            Halaman Tidak Ditemukan
        </p>

        <p className="mt-2 text-gray-500 max-w-md">
            Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <button
            onClick={() => router.push("/")}
            className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
            Kembali ke Home
        </button>
        </div>
    );
}