// import { useEffect } from "react";
// import { useRouter } from "next/router";

// export default function Home() {
//     const router = useRouter();

//     useEffect(() => {
//         // router.replace("/login"); // redirect ke login
//         router.replace("/home/homeKonsumen"); // redirect ke home konsumen
//     }, [router]);

//   return null; // tidak render apa-apa
// }


export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/home/homeKonsumen",
      permanent: false,
    },
  };
}

export default function Home() {
  return null;
}