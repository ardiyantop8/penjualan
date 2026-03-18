import API from './API';

const BASE_URL = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec";

export const barangService = {
    // Get all barang masuk
    getBarangMasuk: async ({ page = 1, rows = 10, idBarang } = {}) => {
        try {

            let body;

            if (idBarang) {
            body = { idBarang };
            } else {
            body = { page, rows };
            }

            const res = await fetch(`${BASE_URL}?action=inquiryBarangMasukSort`, {
            method: "POST",
            body: JSON.stringify(body)
            });

            return await res.json();

        } catch (error) {
            console.error("Error fetching barang masuk:", error);
            throw error;
        }
    },

  // Get all jenis barang
    getJenisBarang: async (page = 1, rows = 20) => {
        try {
        const res = await fetch(`${BASE_URL}?action=inquiryJenisBarang`, {
            method: "POST",
            body: JSON.stringify({
            page,
            rows
            })
        });
        return await res.json();
        } catch (error) {
        console.error('Error fetching jenis barang:', error);
        throw error;
        }
    },

    // Create barang
    createBarang: async (data) => {
        try {
        const res = await fetch(`${BASE_URL}?action=createBarang`, {
            method: "POST",
            body: JSON.stringify({
            action: "createBarang",
            ...data
            })
        });
        return await res.json();
        } catch (error) {
        console.error('Error creating barang:', error);
        throw error;
        }
    },

    // Create jenis barang
    createJenisBarang: async (namaJenis, namaBranch, aksesoris) => {
        try {
        const res = await fetch(`${BASE_URL}?action=createJenisBarang`, {
            method: "POST",
            body: JSON.stringify({
                namaJenis,
                namaBranch,
                aksesoris
            })
        });
        return await res.json();
        } catch (error) {
        console.error('Error creating jenis barang:', error);
        throw error;
        }
    },

    // Update barang
    updateBarang: async (id, data) => {
        try {
        const res = await fetch(`${BASE_URL}?action=updateBarang`, {
            method: "POST",
            body: JSON.stringify({
            id,
            ...data
            })
        });
        return await res.json();
        } catch (error) {
            console.error('Error updating barang:', error);
            throw error;
        }
    },

    // Delete barang
    deleteBarang: async (id) => {
        try {
        const res = await fetch(`${BASE_URL}?action=deleteBarang`, {
            method: "POST",
            body: JSON.stringify({ id })
        });
        return await res.json();
        } catch (error) {
            console.error('Error deleting barang:', error);
            throw error;
        }
    },

    // Inquiry detail barang
    getDetailBarang: async (id) => {
        try {
        const res = await fetch(`${BASE_URL}?action=inquiryDetailBarang`, {
            method: "POST",
            body: JSON.stringify({ id })
        });
        return await res.json();
        } catch (error) {
            console.error('Error fetching detail barang:', error);
            throw error;
        }
    },

    // Inquiry detail barang
    addCart: async (idAnggota, idBarang, totalBarang, tglUpdated, status) => {
        try {
        const res = await fetch(`${BASE_URL}?action=createKeranjang`, {
            method: "POST",
            body: JSON.stringify({
                idAnggota,
                idBarang,
                totalBarang,
                tglUpdated,
                status
            })
        });
        return await res.json();
        } catch (error) {
            console.error('Error fetching db keranjang:', error);
            throw error;
        }
    },

    getAksesMenu: async (idanggota) => {
        const res = await fetch(`${BASE_URL}?action=aksesmenu`, {
        method: "POST",
        body: JSON.stringify({
            idanggota
        })
        });

        return await res.json();
    },

    getMenuById: async (idmenuArray) => {
        const res = await fetch(`${BASE_URL}?action=inquirymenuid`, {
        method: "POST",
        body: JSON.stringify({
            idmenu: idmenuArray
        })
        });

        return await res.json();
    }
};

export default barangService;
