import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/user/ProductCard';
import { prodUri } from '../../constant';

export default function UserProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Search by category');
  const [sortOption, setSortOption] = useState('featured');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${prodUri}api/products`);
        const data = await res.json();
        setProducts(data);
        
        // Extract unique categories (case-insensitive)
        const categorySet = new Set();
        data.forEach(product => {
          if (product.category) {
            categorySet.add(product.category.toLowerCase());
          }
        });
        
        // Get original case categories by finding first occurrence
        const uniqueCategories = Array.from(categorySet).map(lowerCaseCat => {
          const found = data.find(p => p.category && p.category.toLowerCase() === lowerCaseCat);
          return found ? found.category : lowerCaseCat;
        });
        
        setCategories(['Search by category', ...uniqueCategories.sort()]);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    
    // Filter by category (case-insensitive)
    if (selectedCategory !== 'Search by category') {
      result = result.filter(product => 
        product.category && 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort products
    switch(sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        // Keep original order or sort by some featured criteria
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOption, products]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10 text-center">
        <h1 className="text-4xl font-bold mb-6">All Products</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold">All Products</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border rounded px-4 py-2 w-full sm:w-auto"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border rounded px-4 py-2 w-full sm:w-auto"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
          <button 
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors w-full sm:w-auto"
          >
            Go Back
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}