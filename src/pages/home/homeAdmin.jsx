import useSessionStore from '@/stores/useSessionStore';
import { useRouter } from "next/router";
import { useEffect } from "react";
// import CardActionArea from '@mui/material/CardActionArea';
// import HomeLayout from '@/components/templates/HomeLayout';

import { Card, CardContent, Typography, Button } from "@mui/material"
import InventoryIcon from "@mui/icons-material/Inventory"
import CallReceivedIcon from "@mui/icons-material/CallReceived"
import CallMadeIcon from "@mui/icons-material/CallMade"
import DescriptionIcon from "@mui/icons-material/Description"

const HomeAdmin = () => {
    const router = useRouter();
    const user = useSessionStore(state => state.user);
    // const clearUser = useSessionStore(state => state.clearUser);

    useEffect(() => {
        if (!user) {
            router.replace("/login/login");
        }
    }, [user]);

    // const handleLogout = () => {
    //     clearUser(); // bersihkan state zustand
    //     useSessionStore.persist.clearStorage(); // hapus localStorage
    //     router.replace("/login/login"); // redirect ke login
    // };
    
    // BLOCK render jika user belum ready
    if (!user) return null;

    const data = {
        totalBarang: 120,
        barangMasuk: 45,
        barangKeluar: 30,
        laporan: 12
    }

    const cards = [
        {
            title: "Data Barang",
            total: data.totalBarang,
            color: "bg-cyan-600",
            icon: <InventoryIcon fontSize="large" />,
            link: "#"
        },
        {
            title: "Barang Masuk",
            total: data.barangMasuk,
            color: "bg-green-600",
            icon: <CallReceivedIcon fontSize="large" />,
            link: "/barang/masuk"
        },
        {
            title: "Barang Keluar",
            total: data.barangKeluar,
            color: "bg-yellow-500",
            icon: <CallMadeIcon fontSize="large" />,
            link: "/barang/keluar"
        },
        {
            title: "Laporan",
            total: data.laporan,
            color: "bg-red-600",
            icon: <DescriptionIcon fontSize="large" />,
            link: "/laporan"
        }
    ]

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((item, index) => (
                <Card
                    key={index}
                    className={`${item.color} text-white rounded-xl shadow-lg`}
                >
                    <CardContent className="flex flex-col justify-between h-40">
                    
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                        <div>
                        <Typography variant="h6" className="font-semibold">
                            {item.title}
                        </Typography>
                        <Typography variant="h3" className="font-bold mt-2">
                            {item.total}
                        </Typography>
                        </div>
                        <div className="opacity-70">
                        {item.icon}
                        </div>
                    </div>

                    {/* Bottom Button */}
                    <Button
                        variant="text"
                        className="text-white justify-start px-0 mt-4"
                        onClick={() => router.push(item.link)}
                    >
                        Lihat Detail →
                    </Button>

                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
    )
}

export default HomeAdmin