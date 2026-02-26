import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BarangKeluar = () => {
    const daftarBarang = [
        { id: 1, nama: "Mouse" },
        { id: 2, nama: "Keyboard" },
        { id: 3, nama: "Monitor" },
    ];

    const [customer, setCustomer] = useState("");
    const [items, setItems] = useState([
        { idBarang: "", qty: 1 },
    ]);

    const handleAddItem = () => {
        setItems([...items, { idBarang: "", qty: 1 }]);
    };

    const handleRemoveItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleChangeItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            customer,
            tanggal: new Date().toISOString(),
            items,
        };

        console.log("Data transaksi:", payload);
        alert("Transaksi berhasil (cek console)");
    };
    return (
        <>
            <Paper sx={{ p: 3, maxWidth: 700 }}>
                <Typography variant="h6" mb={2}>
                    Form Barang Keluar
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Nama Customer"
                        fullWidth
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    {items.map((item, index) => (
                    <Grid container spacing={2} key={index} mb={1}>
                        <Grid item xs={6}>
                        <TextField
                            select
                            label="Barang"
                            fullWidth
                            value={item.idBarang}
                            onChange={(e) =>
                            handleChangeItem(index, "idBarang", e.target.value)
                            }
                        >
                            {daftarBarang.map((barang) => (
                            <MenuItem key={barang.id} value={barang.id}>
                                {barang.nama}
                            </MenuItem>
                            ))}
                        </TextField>
                        </Grid>

                        <Grid item xs={4}>
                        <TextField
                            type="number"
                            label="Qty"
                            fullWidth
                            value={item.qty}
                            onChange={(e) =>
                            handleChangeItem(index, "qty", e.target.value)
                            }
                        />
                        </Grid>

                        <Grid item xs={2} display="flex" alignItems="center">
                        <IconButton
                            color="error"
                            onClick={() => handleRemoveItem(index)}
                            disabled={items.length === 1}
                        >
                            <DeleteIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                    ))}

                    <Button
                    variant="outlined"
                    onClick={handleAddItem}
                    sx={{ mt: 1 }}
                    >
                    + Tambah Barang
                    </Button>

                    <Box mt={3}>
                    <Button type="submit" variant="contained" color="success">
                        Simpan Transaksi
                    </Button>
                    </Box>
                </Box>
                </Paper>
        </>
    )
}

export default BarangKeluar