import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { type Product } from '../types/Product';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="text-red-600 bg-red-100 p-6 rounded-lg">
            <p className="font-medium text-lg mb-2">Product Not Found</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
          <Link
            to="/products"
            className="mt-4 block text-blue-600 hover:underline"
          >
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-6"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-64 w-full object-contain"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-blue-600 font-bold text-xl">${product.price}</span>
              <span className="ml-4 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {product.category}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-medium">{product.rating.rate}</span>
              <span className="text-gray-500 ml-2">({product.rating.count} reviews)</span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;