import { Product, ProductFormData } from '../types/Product';

const API_BASE = 'https://fakestoreapi.com';

export const productsApi = {
  // Get all products
  getProducts: async (limit = 10, page = 1): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  // Create product
  createProduct: async (product: ProductFormData): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  // Update product
  updateProduct: async (id: number, product: ProductFormData): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  // Delete product
  deleteProduct: async (id: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return true;
  },
};