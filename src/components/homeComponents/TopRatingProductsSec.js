import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function TopRatingProductsSec() {

    const [products, setProducts] = useState([]);
    const numberOfProducts = 4;

    const truncateTitle = (title, maxLength = 50) => {
        return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                
                const filteredProducts = response.data
                    .filter(product => product.rating?.rate > 0)
                    .sort((a, b) => b.rating.rate - a.rating.rate)
                    .slice(0, numberOfProducts);
                
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="bg-gray-50 py-24 transition-all duration-500">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12">
                
                {/* Header Section */}
                <div className="text-center mb-12"> 
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Rated Products</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover the most loved and highly-rated products by our satisfied customers.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div 
                            key={product.id} 
                            className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 
                            ${index === 1 || index === 2 ? 'lg:col-span-2' : 'lg:col-span-1'} `}
                            style={{ height: '460px' }}
                        >
                            <div className="relative h-2/3 overflow-hidden"> 
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="w-full h-full object-contain p-4"
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between h-1/3">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {truncateTitle(product.title)}
                                    </h3>
                                </div>
                                {/* Fixed Position for Price */}
                                <div className="flex items-center justify-between mt-auto"> 
                                    <span className="text-xl text-gray-900 font-bold">${product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
