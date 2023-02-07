import { ProductWithReviews } from '@/pages/shop/[category]/[productId]';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';

interface ProductData {
  product: ProductWithReviews;
  relatedProducts: Product[];
}

const getProducts = async (): Promise<Product[] | ProductWithReviews[]> => {
  const response = await fetch('/api/products');
  return response.json();
};

const getProductsFromCategory = async (
  category: any
): Promise<Product[] | ProductWithReviews[]> => {
  const response = await fetch(`/api/products/${category}`);
  return response.json();
};

const getSingleProduct = async (query: any): Promise<ProductData> => {
  const response = await fetch(
    `/api/products/${query.category}/${query.productId}`
  );
  return response.json();
};

export default {
  getProducts,
  getProductsFromCategory,
  getSingleProduct,
};
