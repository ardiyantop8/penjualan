import '@/styles/globals.css'
import HomeLayout from "@/components/templates/HomeLayout"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function App({ Component, pageProps, router }) {
  config.autoAddCss = false;
  // halaman tanpa layout
  const noLayoutRoutes = ['/login/login', '/register/register', '/home/homeKonsumen','/password/forgot-password'];

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