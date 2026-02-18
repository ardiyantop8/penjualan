import { Paper } from "@mui/material";

export default function ReadmeResponsive() {
  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: "#F2C94C",
        fontWeight: 800,
      }}
    >
      <p className="text-lg mb-4">RULES RESPONSIVE WEB :</p>{" "}
      <p>Kalau desktop, as is design figma</p>{" "}
      <p>Responsive web di mobile & tablet :</p>
      <ul className="px-6">
        <li>
          Kalau dia input field, fill container sesuai ukuran layar; tidak boleh
          overflow
        </li>{" "}
        <li>
          Kalau input fieldnya ada yang 1 baris 2 kolom atau lebih, tetap inline
          kebawah 1-1
        </li>{" "}
        <li>Kalau table, bentukan tetap table tapi scrollable horizontal</li>{" "}
        <li>Kalau pop up, tetap sama</li>
        <li>
          Kalau filter yang 2/3 kolom, in line ke bawah 1-1; tidak berlaku untuk
          table
        </li>{" "}
        <li>
          Cards list register yang mirip register SKPP, in line 1-1 kebawah
        </li>
        <li>Semua yang bisa dikecilin space nya, dipepetin spacenya.</li>
      </ul>
    </Paper>
  );
}
