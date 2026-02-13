const baseUrl = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec";

export const fetchAksesMenu = async (body) => {
    const res = await fetch(`${baseUrl}?action=aksesMenu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return res.json();
};

export const fetchMenuById = async (body) => {
    const res = await fetch(`${baseUrl}?action=menuById`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return res.json();
};