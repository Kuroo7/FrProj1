import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-100 bg-[url('https://via.placeholder.com/1200x100.png?text=Landscape')] bg-cover bg-bottom p-4 flex justify-between items-center relative">
      <div className="flex space-x-4">
        <div className="relative">
          <Link to="/" className="text-gray-600 hover:text-black text-sm font-medium">
            Home 
          </Link>
        </div>
        <Link to="/about" className="text-gray-600 hover:text-black text-sm font-medium">About</Link>
        <div className="relative">
          <Link to="/products" className="text-gray-600 hover:text-black text-sm font-medium">
            Explore 
          </Link>
          
        </div>
        <Link to="/redeem" className="text-gray-600 hover:text-black text-sm font-medium">Redeem Voucher</Link>
        <Link to="/login" className="text-gray-600 hover:text-black text-sm font-medium">Sign In</Link>
        <Link to="/partner" className="text-gray-600 hover:text-black text-sm font-medium">Partner With Us</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <button className="text-gray-600 hover:text-black">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <Link to="/cart" className="relative text-gray-600 hover:text-black">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0l-1 7m1-7l-1 3m0 0l.3 3m4.9 8a2 2 0 11-4 0 2 2 0 014 0zm-3-8h.01M21 21h-7"></path>
          </svg>
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
        </Link>
      </div>
    </nav>
  );
}