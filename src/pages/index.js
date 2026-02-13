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