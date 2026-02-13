export async function get(url) {
    const res = await fetch(url);
    return res.json();
}

export async function post(url, body = {}) {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
