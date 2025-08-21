import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to ProductStore</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        Discover amazing products at great prices. Browse our collection and find exactly what you're looking for.
      </p>
      <Link 
        to="/products" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Explore Products
      </Link>
    </div>
  );
};

export default Home;