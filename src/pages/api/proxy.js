export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { action, body, baseUrl } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Missing action parameter" });
    }

    // Pakai baseUrl jika dikirim, atau default dari env
    const scriptUrl = baseUrl || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return res.status(500).json({ message: "Apps Script URL tidak diset" });
    }

    // Buat URL penuh ke Apps Script
    const url = `${scriptUrl}?action=${encodeURIComponent(action)}`;

    // Fetch ke Apps Script
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body || {}),
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    console.error("API Proxy Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
