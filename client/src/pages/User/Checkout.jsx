import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/user/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discountedCart, setDiscountedCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDiscountedCart(cart.map(item => ({
      ...item,
      discountedPrice: item.price,
      originalPrice: item.price
    })));
  }, [cart]);

  const subtotal = discountedCart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const discountAmount = discountedCart.reduce((sum, item) => sum + ((item.originalPrice - item.discountedPrice) * item.quantity), 0);
  const total = subtotal - discountAmount;

  const applyVoucher = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post(
        'http://localhost:5000/api/vouchers/apply',
        {
          code: voucherCode,
          cartProductIds: cart.map(item => item._id),
        },
        { withCredentials: true }
      );

      const updatedCart = discountedCart.map(item => {
        const isEligible = data.appliedProducts?.includes(item._id) || false;
        return {
          ...item,
          discountedPrice: isEligible 
            ? item.originalPrice * (1 - data.discountPercentage / 100)
            : item.originalPrice
        };
      });

      setDiscountedCart(updatedCart);
      setAppliedVoucher({
        code: voucherCode,
        discountPercentage: data.discountPercentage,
        appliedProducts: data.appliedProducts
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply voucher');
    } finally {
      setLoading(false);
    }
  };

  const removeVoucher = () => {
    setDiscountedCart(cart.map(item => ({
      ...item,
      discountedPrice: item.price,
      originalPrice: item.price
    })));
    setAppliedVoucher(null);
    setVoucherCode('');
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const orderedProducts = discountedCart.map(item => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderedProducts,
          voucherCode: appliedVoucher?.code || null,
        },
        { withCredentials: true }
      );

      clearCart();
      navigate(`/order-confirmation/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setAppliedVoucher(null);
    setVoucherCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 shadow-sm">
            {error}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
            <Link to="/" className="text-green-600 hover:underline mt-2 inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-600 hover:underline transition-all"
                >
                  Clear Cart
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 divide-y divide-gray-200">
                {discountedCart.map((item) => {
                  const isDiscounted = item.discountedPrice < item.originalPrice;
                  return (
                    <div key={item._id} className="py-4 flex items-center transition-all hover:bg-gray-50">
                      <img
                        src={item.imageUrls[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          {isDiscounted ? (
                            <>
                              <span className="text-gray-400 line-through mr-2">
                                ₹{item.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-green-600 font-medium">
                                ₹{item.discountedPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-600">
                              ₹{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-gray-600 ml-2">× {item.quantity}</span>
                        </div>
                      </div>
                      <div className="font-medium text-gray-800">
                        ₹{(item.discountedPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Voucher Section */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply Voucher</h3>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Enter voucher code"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    disabled={!!appliedVoucher}
                  />
                  {appliedVoucher ? (
                    <button
                      onClick={removeVoucher}
                      className="px-4 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-all"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={applyVoucher}
                      disabled={loading || !voucherCode}
                      className={`px-4 py-2 bg-green-600 text-white rounded-r-lg transition-all ${
                        loading || !voucherCode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                      }`}
                    >
                      {loading ? 'Applying...' : 'Apply'}
                    </button>
                  )}
                </div>
                {appliedVoucher && (
                  <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg">
                    Voucher applied: {appliedVoucher.code} ({appliedVoucher.discountPercentage}% off on selected items)
                  </div>
                )}
              </div>
            </div>

            {/* Order Total */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Total</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {appliedVoucher && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition-all ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                  }`}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}