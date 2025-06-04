
// Truncate text function to limit the length of a string
// If the text is longer than the specified maxLength, it will be trimmed and "..." will be added.
const truncateText = (text = '', maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
    }
    return text;
};


// ProductCard Component to display a single product card
export default function ProductCard({ product }) {
    // Show a loading message if the product data hasn't been loaded yet
    if (!product) return <div className="text-center p-4">Loading...</div>;

    return (
        <div 
            className="w-full sm:w-80 mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[500px]"
        > 
            {/* Product Image Container */}
            <div className="h-52 bg-gray-100 flex items-center justify-center p-3">
                <img
                    src={product.image} // Image source URL from the product data
                    alt={product.title} // Image alt text for accessibility
                    className="h-full object-contain select-none" // Prevents user from selecting the image
                />
            </div>

            {/* Product Content Container */}
            <div className="p-6 flex flex-col justify-between h-[calc(100%-208px)]">
                
                {/* Product Title and Description */}
                <div>
                    {/* Product Title (Truncated if too long) */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 select-none">
                        {truncateText(product.title, 40)}
                    </h3>
                    
                    {/* Product Description (Limited to 3 lines using line-clamp-3) */}
                    <p className="text-gray-600 text-sm mb-5 line-clamp-3 select-none">
                        {product.description}
                    </p>
                </div>

                {/* Product Price and Action Button */}
                <div className="flex items-center justify-between mt-auto">
                    {/* Displaying the product price */}
                    <span className="text-xl font-medium text-gray-800 select-none">
                        ${product.price}
                    </span>
                </div>
            </div>
        </div>
    );
}
