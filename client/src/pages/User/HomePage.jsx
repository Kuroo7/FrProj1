
import { useEffect, useState } from 'react';
import Navbar from '../../components/user/Navbar';
import axios from 'axios';
import ProductCard from '../../components/user/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('https://frproj1.onrender.com/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    getProducts();
  }, []);

  const bestSellers = products.filter(product => product.isBestSeller);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen bg-green-600 text-white py-20 px-6"
        style={{
          backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-5xl ml-40 mt-20 flex flex-col items-start ">
          <p className="text-md font-medium uppercase tracking-widest mb-4">Save yes to better health</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Better Gut</h1>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Better Work</h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Your wellness starts within. Discover how gut health can<br></br> transform your energy, mood, and daily performance.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white  text-green-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-all">
              Redeem Voucher
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-bold hover:bg-white hover:text-green-600 transition-all">
              Explore Tests
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative -mt-28  py-12 px-6">
        <div className="max-w-6xl mx-auto flex justify-center gap-6">
          <div className="bg-white rounded-lg h-64 shadow-md p-6 w-1/3 text-center">
            <h4 className="text-yellow-600 text-sm font-semibold mb-2">Feature 01</h4>
            <h3 className="text-xl font-bold mb-4">Corporate Vouchers</h3>
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div> {/* Placeholder for image */}
          </div>
          <div className="bg-white rounded-lg h-64 shadow-md p-6 w-1/3 text-center">
            <h4 className="text-yellow-600 text-sm font-semibold mb-2">Feature 02</h4>
            <h3 className="text-xl font-bold mb-4">Doctor Referrals</h3>
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div> {/* Placeholder for image */}
          </div>
          <div className="bg-white rounded-lg h-64 shadow-md p-6 w-1/3 text-center">
            <h4 className="text-yellow-600 text-sm font-semibold mb-2">Feature 03</h4>
            <h3 className="text-xl font-bold mb-4">Explore Sova Tests</h3>
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div> {/* Placeholder for image */}
          </div>
        </div>
      </div>


      <div className='max-w-6xl mx-auto'>
  <h1 className='text-center text-6xl font-semibold my-5'>Best Seller</h1>
  <div className='flex max-w-6xl mx-auto flex-wrap'>
    {bestSellers.map(bestProducts => (
      <ProductCard key={bestProducts._id} product={bestProducts} />
    ))}
  </div>
  <div className='flex justify-center mt-5'>
    <button className='bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors'
     onClick={() => navigate('/products')}
    >
      Explore more
    </button>
  </div>
</div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto h-screen px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="lg:w-1/2">
            <p className="text-yellow-600 text-lg font-semibold mb-2">Get to Know Us</p>
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">Building a Healthier,<br></br> More Productive <br></br>  Workforce</h2>
            <p className="text-gray-500 mb-6 text-lg ">
              FITPLAY×Sova empowers professionals with preventative health diagnostics that improve well-being, reduce burnout, and elevate productivity. Whether through corporate benefits or doctor guidance – we make health simple, proactive, and impactful.
            </p>
            <p className="text-green-600 font-semibold text-lg mb-4">Modern Agriculture Types</p>
            <p className="text-gray-500 mb-6 text-lg">We’re here for you from start to <br></br>finish</p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-all">
              Discover More
            </button>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex flex-col items-center gap-4">
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div> {/* Placeholder for farmer with apples */}
            <div className="relative w-full h-32 bg-gray-200 rounded-lg">
              {/* Placeholder for tractor image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center">
                  <p className="text-2xl font-bold text-gray-800">2.0</p>
                </div>
              </div>
              <p className="absolute bottom-4 right-4 text-sm text-gray-600">20 Partners Around India</p>
            </div>
          </div>
        </div>
      </div>

      {/* what we offer */}
      <div className="relative  bg-green-600 h-[70vh] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest mb-4">Our Service</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">what we offer</h1>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative -mt-[20%] py-12 px-6">
        <div className="max-w-6xl mx-auto flex justify-center gap-6">
          <div className='w-1/3'>
            <div
              className=" h-64  bg-gray-200"
              style={{
                backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            {/* Card Content */}
            <div className="p-4 bg-white rounded-b-lg">
              <div className="flex justify-between  items-start">
                <h3 className="text-2xl font-bold m-5 text-gray-800">title</h3>
                <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15h-4v-3c0-1.1-.9-2-2-2h-2V4.414z" />
                  </svg>
                </div>
              </div>
              <p className="m-5 text-gray-500 text-lg mt-2">description</p>
            </div>
          </div>
          <div className='w-1/3'>
            <div
              className=" h-64  bg-gray-200"
              style={{
                backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            {/* Card Content */}
            <div className="p-4 bg-white rounded-b-lg">
              <div className="flex justify-between  items-start">
                <h3 className="text-2xl font-bold m-5 text-gray-800">title</h3>
                <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15h-4v-3c0-1.1-.9-2-2-2h-2V4.414z" />
                  </svg>
                </div>
              </div>
              <p className="m-5 text-gray-500 text-lg mt-2">description</p>
            </div>
          </div>
          <div className='w-1/3'>
            <div
              className=" h-64  bg-gray-200"
              style={{
                backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            {/* Card Content */}
            <div className="p-4 bg-white rounded-b-lg">
              <div className="flex justify-between  items-start">
                <h3 className="text-2xl font-bold m-5 text-gray-800">title</h3>
                <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15h-4v-3c0-1.1-.9-2-2-2h-2V4.414z" />
                  </svg>
                </div>
              </div>
              <p className="m-5 text-gray-500 text-lg mt-2">description</p>
            </div>
          </div>
        </div>
      </div>

      <div className='h-screen '>
        <div className='flex pb-6 h-full justify-center items-center gap-20 flex-wrap'>
          <div className='w-1/4 capitalize font-semibold '>
            <h1 className='text-6xl'>
              from first <br></br>  step to <br></br>  finish line<br></br>  we're with you</h1>
          </div>
          <div className='w-1/4 h-[45%] bg-amber-200 flex flex-col  items-start '>
            <div className="w-20 h-20 mt-8 ml-8 mb-4 rounded-full bg-gray-200"></div>
            <h1 className='ml-8 text-2xl font-semibold' >Personilized <br></br> Assesment</h1>
            <p className='ml-8'>lorem32</p>
          </div>
          
          <div className='w-1/4 h-[45%] bg-amber-200 flex flex-col  items-start '>
            <div className="w-20 h-20 mt-8 ml-8 mb-4 rounded-full bg-gray-200"></div>
            <h1 className='ml-8 text-2xl font-semibold' >Personilized <br></br> Assesment</h1>
            <p className='ml-8'>lorem32</p>
          </div>
          <div className='w-1/4 h-[45%] bg-amber-200 flex flex-col  items-start '>
            <div className="w-20 h-20 mt-8 ml-8 mb-4 rounded-full bg-gray-200"></div>
            <h1 className='ml-8 text-2xl font-semibold' >Personilized <br></br> Assesment</h1>
            <p className='ml-8'>lorem32</p>
          </div>
          <div className='w-1/4 h-[45%] bg-amber-200 flex flex-col  items-start '>
            <div className="w-20 h-20 mt-8 ml-8 mb-4 rounded-full bg-gray-200"></div>
            <h1 className='ml-8 text-2xl font-semibold' >Personilized <br></br> Assesment</h1>
            <p className='ml-8'>lorem32</p>
          </div>
          <div className='w-1/4 h-[45%] bg-amber-200 flex flex-col  items-start '>
            <div className="w-20 h-20 mt-8 ml-8 mb-4 rounded-full bg-gray-200"></div>
            <h1 className='ml-8 text-2xl font-semibold' >Personilized <br></br> Assesment</h1>
            <p className='ml-8'>lorem32</p>
          </div>
        </div>

      </div>


      {/* Video Banner Section */}
      <div className="relative bg-gray-800 text-white py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Eco-Friendly Products can be made from Scratch</h2>
          <button className="w-16 h-16 rounded-full bg-white text-gray-800 flex items-center justify-center mx-auto">
            <span className="text-2xl">▶</span>
          </button>
        </div>
      </div>

      {/* News & Articles Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">News & Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-200"></div> {/* Placeholder for article image */}
              <div className="p-4">
                <p className="text-gray-600 text-sm">From the Site</p>
                <h3 className="text-lg font-semibold">Lorem Ipsum</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white text-gray-800 rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200"></div> {/* Placeholder for icon */}
                <h3 className="text-lg font-semibold">Lorem Ipsum</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">From First Step to Finish Line; We’re With You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Targeted Wellness Plans', 'Personalized Assessment', 'Science-Backed Testing', 'Track & Transform', 'Sustainable Thrive'].map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200"></div> {/* Placeholder for icon */}
              <h3 className="text-lg font-semibold">{step}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section (Repeated) */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-green-600">87%</p>
            <p className="text-gray-600">Productivity Increase</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">20+</p>
            <p className="text-gray-600">Countries Use Us</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">78%</p>
            <p className="text-gray-600">Physical Boost</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">92%</p>
            <p className="text-gray-600">Mental Boost</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-yellow-400 text-gray-800 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex justify-center gap-8">
          {['Wheat', 'Agro', 'The Farm', 'Natural Choices', 'Agric'].map((partner, index) => (
            <div key={index} className="text-lg font-semibold">{partner}</div>
          ))}
        </div>
      </footer>
    </div>
  );
}