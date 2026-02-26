import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Button,
  Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const KeranjangKonsumen = () => {
    const [cart, setCart] = useState([]);

    // Ambil cart dari localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Update localStorage setiap cart berubah
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleIncrease = (id) => {
        const updated = cart.map(item =>
        item.id === id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        setCart(updated);
    };

    const handleDecrease = (id) => {
        const updated = cart.map(item =>
        item.id === id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        );
        setCart(updated);
    };

    const handleDelete = (id) => {
        const filtered = cart.filter(item => item.id !== id);
        setCart(filtered);
    };

    const totalHarga = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

            {cart.length === 0 ? (
                <div className="text-center text-gray-500">
                Keranjang masih kosong
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                
                {/* List Produk */}
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item) => (
                    <Card key={item.id} className="rounded-xl shadow-md">
                        <CardContent className="flex gap-4 items-center">
                        
                        <img
                            src={item.image}
                            className="w-24 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                            <h2 className="font-bold text-lg">
                            {item.name}
                            </h2>
                            <p className="text-gray-500">
                            Rp {item.price.toLocaleString()}
                            </p>

                            {/* Qty Control */}
                            <div className="flex items-center gap-2 mt-2">
                            <IconButton
                                onClick={() => handleDecrease(item.id)}
                            >
                                <RemoveIcon />
                            </IconButton>

                            <span className="font-semibold">
                                {item.qty}
                            </span>

                            <IconButton
                                onClick={() => handleIncrease(item.id)}
                            >
                                <AddIcon />
                            </IconButton>
                            </div>
                        </div>

                        {/* Delete */}
                        <IconButton
                            onClick={() => handleDelete(item.id)}
                            color="error"
                        >
                            <DeleteIcon />
                        </IconButton>

                        </CardContent>
                    </Card>
                    ))}
                </div>

                {/* Summary */}
                <div>
                    <Card className="rounded-xl shadow-md">
                    <CardContent>
                        <h2 className="text-xl font-bold mb-4">
                        Ringkasan Belanja
                        </h2>

                        <div className="flex justify-between mb-2">
                        <span>Total Item</span>
                        <span>{cart.length}</span>
                        </div>

                        <Divider className="my-3" />

                        <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Total Harga</span>
                        <span>
                            Rp {totalHarga.toLocaleString()}
                        </span>
                        </div>

                        <Button
                        variant="contained"
                        fullWidth
                        className="bg-indigo-600"
                        >
                        Checkout
                        </Button>

                    </CardContent>
                    </Card>
                </div>

                </div>
            )}
            </div>
    )
}

export default KeranjangKonsumen