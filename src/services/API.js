const BASE_URL = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec";

const API = {
    // GET
    menu: `${BASE_URL}?action=menu`,

    // POST dynamic
    action: (action) => `${BASE_URL}?action=${action}`,
};

export default API;
