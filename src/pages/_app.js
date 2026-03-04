import '@/styles/globals.css'
import { useRef, useEffect } from "react";
import HomeLayout from "@/components/templates/HomeLayout"
import KonsumenLayout from "@/components/templates/KonsumenLayout"
import LoadingModal from "@/components/organisms/modals/LoadingModal"
import { ModalLoadingUtil } from "@/helpers/ModalLoadingUtil"
import SuccessModal from "@/components/organisms/modals/SuccessModal"
import { ModalSuccessUtil } from "@/helpers/ModalSuccessUtil"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";


export default function App({ Component, pageProps, router }) {
  config.autoAddCss = false;
  const loadingRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    ModalLoadingUtil.setModalRef(loadingRef);
  }, []);

  useEffect(() => {
    ModalLoadingUtil.setModalRef(loadingRef);
    ModalSuccessUtil.setModalRef(successRef);
  }, []);
  
  // halaman tanpa layout (misal login dan register)
  const noLayoutRoutes = [
    '/login/login',
    '/register/register',
    '/password/forgot-password',
    '/404',
  ];

  // konsumen routes pake KonsumenLayout
  const konsumenRoutes = ['/home/homeKonsumen', '/produk', '/status', '/profil/profilKonsumen', '/keranjang']; // prefix untuk halaman produk

  let content;
  if (noLayoutRoutes.includes(router.pathname)) {
    content = <Component {...pageProps} />
  }  else if (konsumenRoutes.some(path => router.pathname.startsWith(path))) {
    content = (
      <KonsumenLayout>
        <Component {...pageProps} />
      </KonsumenLayout>
    )
  } else {
    content = (
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    )
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
    <>
      {content}
      <LoadingModal ref={loadingRef} />
      <SuccessModal ref={successRef} />
    </>
  )
}