import '@/styles/globals.css'
import HomeLayout from "@/components/templates/HomeLayout"
import KonsumenLayout from "@/components/templates/KonsumenLayout"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";


export default function App({ Component, pageProps, router }) {
  config.autoAddCss = false;
  // halaman tanpa layout (misal login dan register)
  const noLayoutRoutes = [
    '/login/login',
    '/register/register',
    '/password/forgot-password',
    '/404',
  ];

  // konsumen routes pake KonsumenLayout
  const konsumenRoutes = ['/home/homeKonsumen', '/produk', '/status', '/profil/profilKonsumen', '/keranjang']; // prefix untuk halaman produk

  if (noLayoutRoutes.includes(router.pathname)) {
    return <Component {...pageProps} />
  }

  if (konsumenRoutes.some(path => router.pathname.startsWith(path))) {
    return (
      <KonsumenLayout>
        <Component {...pageProps} />
      </KonsumenLayout>
    )
  }

  // default: admin layout
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  )
}