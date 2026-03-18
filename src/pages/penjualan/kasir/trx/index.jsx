// pages/kasir.jsx
import { useEffect, useRef, useState } from "react";
import { TextField, Paper, Typography } from "@mui/material";

export default function KasirPage() {
  const [keranjang, setKeranjang] = useState([]);
  const inputRef = useRef(null);

  // auto focus ke input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchBarang = async (barcode) => {
    try {
      const res = await fetch(`/api/getBarang?barcode=${barcode}`);
      const result = await res.json();

      if (result.responseCode !== "00") {
        alert("Barang tidak ditemukan");
        return;
      }

      const barang = result.data;

      setKeranjang((prev) => {
        const exist = prev.find((item) => item.barcode === barang.barcode);

        if (exist) {
          return prev.map((item) =>
            item.barcode === barang.barcode
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        }

        return [...prev, { ...barang, qty: 1 }];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleScan = (e) => {
    if (e.key === "Enter") {
      const barcode = e.target.value.trim();

      if (!barcode) return;

      fetchBarang(barcode);
      e.target.value = "";
    }
  };

  const total = keranjang.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );

  return (
    <div className="p-4 space-y-4">
      {/* INPUT SCAN */}
      <Paper className="p-4">
        <TextField
          inputRef={inputRef}
          label="Scan Barcode"
          variant="outlined"
          fullWidth
          onKeyDown={handleScan}
          autoFocus
        />
      </Paper>

      {/* LIST KERANJANG */}
      <Paper className="p-4">
        <Typography variant="h6">Keranjang</Typography>

        <div className="mt-3 space-y-2">
          {keranjang.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.namaBarang}</p>
                <p className="text-sm text-gray-500">
                  {item.qty} x Rp{item.harga}
                </p>
              </div>
              <p className="font-bold">
                Rp{item.qty * item.harga}
              </p>
            </div>
          ))}
        </div>
      </Paper>

      {/* TOTAL */}
      <Paper className="p-4 flex justify-between">
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">Rp{total}</Typography>
      </Paper>
    </div>
  );
}