export const formatHarga = (harga) => {
    return `Rp. ${parseInt(harga || 0).toLocaleString("id-ID")}`;
};

export const formatNominal = (nominal) => {
    return `${parseInt(nominal || 0).toLocaleString("id-ID")}`;
};