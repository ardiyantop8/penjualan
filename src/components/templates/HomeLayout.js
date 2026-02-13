import { useState, useEffect } from "react";
import useSessionStore from '@/stores/useSessionStore';
import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import { fetchMenu, fetchMenuById } from "@/services/menuService";

export default function HomeLayout({ children }) {
    const router = useRouter();
    const activePath = router.asPath;
    const clearUser = useSessionStore(state => state.clearUser);
    const user = useSessionStore(state => state.user);
    // console.log("USER::", user?.idanggota);

    const [open, setOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loadingMenu, setLoadingMenu] = useState(true);
    const [errorMenu, setErrorMenu] = useState(null);

    const handleLogout = () => {
        clearUser();
        useSessionStore.persist.clearStorage();
        router.replace("/login/login");
    };

    // === Fetch menu dari API ===
    useEffect(() => {
        if (!user?.idanggota) return;

        const proxyUrl = "/api/proxy";

        const loadMenu = async () => {
        setLoadingMenu(true);
        setErrorMenu(null);

        try {
            // 1️⃣ fetch aksesMenu
            const aksesResRaw = await fetch(proxyUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "aksesmenu",
                    body: { idanggota: user.idanggota },
                }),
            });
            const aksesRes = await aksesResRaw.json();
            console.log("AksesMenu Res:", aksesRes);
            if (!aksesRes?.data?.dataId) {
                throw new Error("Tidak ada data akses menu");
            }

            // ambil array idmenu
            const idmenuArray = aksesRes?.data?.dataId.map(item => item.idmenu);

            if (idmenuArray.length === 0) {
                setMenuItems([]);
                return;
            }

            // 2️⃣ fetch menuById
            const menuResRaw = await fetch(proxyUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "inquirymenuid",
                    body: { idmenu: idmenuArray },
                }),
            });
            const menuRes = await menuResRaw.json();
            console.log("MenuById Res:", menuRes);
            if (menuRes?.responseCode === "00") {
                // console.log("RESDD:",menuRes);
                setMenuItems(menuRes?.data?.data || []);
            } else {
                throw new Error(menuRes?.message || "Gagal fetch menu");
            }

        } catch (err) {
            console.error("loadMenu error", err);
            setErrorMenu(err.message || "Terjadi kesalahan");
            setMenuItems([]);
        } finally {
            setLoadingMenu(false);
        }
        };

        loadMenu();
    }, [user?.idanggota]);

    const menuAktif = menuItems?.find(item => item.url === activePath);

    if (loadingMenu) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900/70 text-white">
                <h1 className="font-bold text-2xl">Loading menu...</h1>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        );
    }
    if (errorMenu) return <p>Error: {errorMenu}</p>;
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`bg-gray-800 text-white w-64 p-4
                ${open ? "block" : "hidden"} 
                md:block
            `}>
                <h2 className="text-2xl font-semibold mb-3 text-center">Menu</h2>
                <hr></hr>
                <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li
                        key={item.no}
                        className={
                            `p-2 rounded cursor-pointer flex items-center space-x-2 
                            ${activePath === item.url ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
                        }
                        onClick={() => router.push(item.url)}
                        >
                        {item.icon && <i className={`${item.icon}`}></i>}
                        <span>{item.menu}</span>
                    </li>
                ))}
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-100">
                {/* Top bar */}
                <div className="flex items-center justify-between bg-white shadow px-4 h-14">
                    {/* Mobile menu toggle */}
                    <button 
                        className="md:hidden text-xl" 
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>

                    {/* Title */}
                    {/* <h1 className="text-lg font-semibold">Home</h1> */}
                    <h1 className="text-lg font-semibold">{menuAktif?.menu || "Dashboard"}</h1>

                    {/* Logout */}
                    <div className="flex items-center   ">
                        <h2 className="hidden md:block text-lg font-semibold pr-5">Welcome, {user?.nama}</h2>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Keluar
                        </button>
                    </div>
                </div>

                {/* Page content */}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}