import useSessionStore from '@/stores/useSessionStore';
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import HomeLayout from '@/components/templates/HomeLayout';

const HomeAdmin = () => {
    const router = useRouter();
    const user = useSessionStore(state => state.user);
    const clearUser = useSessionStore(state => state.clearUser);

    useEffect(() => {
        if (!user) {
            router.replace("/login/login");
        }
    }, [user]);

    const handleLogout = () => {
        clearUser(); // bersihkan state zustand
        useSessionStore.persist.clearStorage(); // hapus localStorage
        router.replace("/login/login"); // redirect ke login
    };
    
    // BLOCK render jika user belum ready
    if (!user) return null;

    let data = [
        {
            title: "Monitoring Menu",
            description: "Monitoring menu untuk melihat ada berapa jumlah menu yang aktif dan tidak aktif",
            link: "/menu",
            btnTitle: "Lihat",
            btnColor: "primary",
        },
        {
            title: "Monitoring Anggota",
            description: "Monitoring anggota untuk melihat ada berapa jumlah anggota yang aktif dan tidak aktif",
            link: "/anggota",
            btnTitle: "Lihat",
            btnColor: "primary",
        },
        {
            title: "Monitoring Income",
            description: "Monitoring pemasukan setiap anggota",
            link: "/income",
            btnTitle: "Lihat",
            btnColor: "primary",
        },
        {
            title: "Monitoring Outcome",
            description: "Monitoring pengeluaran setiap anggota",
            link: "/outcome",
            btnTitle: "Lihat",
            btnColor: "primary",
        },
    ];

    return (
        // <HomeLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data && data.map((item, index) => (
                    <Card key={index} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item?.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item?.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <div className="flex justify-end pr-2 pb-2">
                            <Button onClick={() => lihatMonitoring(item?.link)} className="rounded-full shadow-lg" variant='outlined' size="small" color={item?.btnColor}>
                                {item?.btnTitle}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        // </HomeLayout>
    )
}

export default HomeAdmin