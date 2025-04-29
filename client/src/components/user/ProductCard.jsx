import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    if (!product) return;
    
    setIsAdding(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-full max-w-xs cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative">
        <img 
          src={product.imageUrls[0]} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button 
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4 space-y-3">
        {/* Main Title */}
        <h1 className="text-lg font-extrabold text-gray-900">
          {product.name}
        </h1>

        {/* Subtitle with Tag */}
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-800">Soya</h2>
          {product.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-1">
              {product.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs capitalize font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Description Lines */}
        <p className="text-sm font-medium text-gray-700">
          {product.description}
        </p>

        {/* Separator */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-600">4.82 / 5.0</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-blue-600 font-bold">Rs. {product.price}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || !product.available}
          className={`w-full py-2 rounded-lg font-medium ${
            isAdding || !product.available
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isAdding ? 'Adding...' : 
           !product.available ? 'Out of Stock' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
}