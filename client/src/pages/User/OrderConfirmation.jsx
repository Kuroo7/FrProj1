import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/user/Navbar';

export default function OrderConfirmation() {
  const  {id}  = useParams(); // Get the orderId from the URL
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details when the component mounts
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`https://frproj1.onrender.com/api/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order details');
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto p-6 text-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg shadow-sm">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto p-6 text-center">
          <p className="text-lg text-gray-600">Order not found.</p>
          <Link to="/" className="text-green-600 hover:underline mt-2 inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600">
            Your order has been successfully placed. Order ID: <span className="font-medium">{order._id}</span>
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-200">
            {order.orderedProducts.map((item, index) => (
              <div key={index} className="py-4 flex items-center">
                <img
                  src={item.product.imageUrls[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600">
                    ₹{item.product.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="font-medium text-gray-800">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Voucher Info */}
          {order.voucher && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Voucher Applied: <span className="font-medium">{order.voucher.code}</span> ({order.voucher.discountPercentage}% off)
              </p>
            </div>
          )}

          {/* Total Price */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-lg font-bold text-gray-800">
            <span>Total:</span>
            <span>₹{order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Payment Status:</span>
              <span className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
                {order.isPaid ? 'Paid' : 'Not Paid'}
              </span>
            </div>
            {order.isPaid && (
              <div className="flex justify-between text-gray-600">
                <span>Paid At:</span>
                <span>{new Date(order.paidAt).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Delivery Status:</span>
              <span className={order.isDelivered ? 'text-green-600' : 'text-yellow-600'}>
                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
              </span>
            </div>
            {order.isDelivered && (
              <div className="flex justify-between text-gray-600">
                <span>Delivered At:</span>
                <span>{new Date(order.deliveredAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all mr-4"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
}