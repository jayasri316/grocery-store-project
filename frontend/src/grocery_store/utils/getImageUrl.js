import { API_BASE_URL } from "./api";

export function getImageUrl(image) {
    if (!image) return null;
    if (image.startsWith("http")) return image;  // Cloudinary URL (already complete)
    return `${API_BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}