import { productApi } from "../../api/productsApi";
import type { Product } from "../interfaces/product";

interface GetProductOptions {
    filterKey?: string
}

const getProducts = async ({ filterKey }: GetProductOptions): Promise<Product[]> => {

    const filterUrl = filterKey ? `category=${filterKey}` : ''
    const { data } = await productApi.get<Product[]>(`/products?${filterUrl}`);

    return data;
};

const getProductId = async (id: number): Promise<Product> => {

    const { data } = await productApi.get<Product>(`/products/${id}`);
    return data;
}

export const productService = {
    getProducts, getProductId
};


