import React from 'react'

const TemplateKiri = () => {
    return (
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-12 flex-col justify-between">
            <div>
            <h1 className="text-4xl font-bold mb-4">Clebee Fashion 🚀</h1>
            <p className="text-lg leading-relaxed opacity-90">
                Platform penjualan pakaian anak modern untuk mendukung style dan kebutuhan sehari hari anak anda.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
                <li>✔ Baju tidur anak</li>
                <li>✔ Baju dress anak</li>
                <li>✔ Celana anak</li>
                <li>✔ Jaket anak</li>
            </ul>
            </div>

            <p className="text-xs opacity-70">
            © {new Date().getFullYear()} Ardiyanto Putra @Clebee Fashion
            </p>
        </div>
    )
}

export default TemplateKiri