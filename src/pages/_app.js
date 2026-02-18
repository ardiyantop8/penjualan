import '@/styles/globals.css'
import HomeLayout from "@/components/templates/HomeLayout"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";


export default function App({ Component, pageProps, router }) {
  config.autoAddCss = false;
  // halaman tanpa layout
  const noLayoutRoutes = [
    '/login/login', 
    '/register/register', 
    '/home/homeKonsumen',
    '/password/forgot-password',
    '/404'
  ];

  if (noLayoutRoutes.includes(router.pathname)) {
    return <Component {...pageProps} />
  }

  // halaman pakai layout
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  )
}