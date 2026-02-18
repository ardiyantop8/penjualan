import dayjs from "dayjs";

export default function FooterBRI() {
  const year = dayjs().year();

  return (
    <footer className="text-xs mt-2 flex gap-1 items-center justify-center">
      &copy; {year}{" "}
      <p className="text-briBlue">PT. Bank Rakyat Indonesia (Persero) Tbk</p> |
      All Rights Reserved
    </footer>
  );
}
