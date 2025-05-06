import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useCart } from '../../context/CartContext';
import { prodUri } from '../../constant';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${prodUri}api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Product Image and Thumbnails */}
        <div className="flex flex-col gap-4">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg"
          />
          <div className="flex gap-2">
            {product.imageUrls.map((url, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-gray-200 rounded-lg"
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-800">{product.name}</h1>
          <p className="text-lg font-medium mb-4 text-gray-800">Category: {product.category}</p>
          <p className="text-sm mb-6 text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mb-4 text-gray-800">
            ₹{product.price.toFixed(2)}
            <span className="text-sm text-gray-500 ml-2">Tax & Shipping calculated at checkout</span>
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all ${
              isAdding ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
          {isAdding && (
            <p className="text-green-600 mt-2 text-center">Added to cart!</p>
          )}
          <button className="w-full bg-black text-white px-6 py-3 rounded-full font-semibold mt-4 hover:bg-gray-800 transition-all">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}