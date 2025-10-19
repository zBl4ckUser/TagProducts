import type { Product } from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/produtos`, { headers });
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers,
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erros.join(", "));
    }
    return response.json();
};
