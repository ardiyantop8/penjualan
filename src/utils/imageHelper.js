/**
 * Convert Google Drive image URL to thumbnail URL
 * @param {string} url - Google Drive image URL
 * @returns {string} - Thumbnail URL or placeholder
 */
export const convertDriveImage = (url) => {
    if (!url) return "https://via.placeholder.com/300x200?text=Produk";

    const match = url.match(/[-\w]{25,}/);
    if (!match) return url;

    const fileId = match[0];

    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};

/**
 * Format image with fallback
 * @param {string} url - Image URL
 * @param {string} alt - Alt text
 * @returns {object} - Object with src and onError handler
 */
export const formatImageWithFallback = (url) => {
    return {
        src: url || "https://via.placeholder.com/300x200?text=Produk",
        onError: (e) => {
            if (e.target.src !== "https://via.placeholder.com/300x200?text=Produk") {
                e.target.src = "https://via.placeholder.com/300x200?text=Produk";
            }
        }
    };
};

/**
 * Get image URL with fallback and error handling
 * @param {string} driveUrl - Google Drive URL
 * @returns {object} - Image props object
 */
export const getImageProps = (driveUrl) => {
    const imageUrl = convertDriveImage(driveUrl);
    return formatImageWithFallback(imageUrl);
};
