import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useProduct } from "../context/ProductContext";

export default function ProductPage() {
  const { cartProduct, setCartProduct } = useProduct();
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleButBtn = () => {
    const updatedCart = [...(cartProduct || [])];
    const existingProduct = updatedCart.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartProduct(updatedCart); // Update context
    sessionStorage.setItem("cartProduct", JSON.stringify(updatedCart)); // Save to session

    toast.success("Product added to cart", { theme: "light" });
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow p-6">
        {/* Image */}
        <div className="flex-shrink-0 h-64 w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Rating stars */}
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating?.rate)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.155c.969 0 1.371 1.24.588 1.81l-3.364 2.448a1 1 0 00-.364 1.118l1.286 3.949c.3.92-.755 1.688-1.538 1.118l-3.364-2.448a1 1 0 00-1.176 0l-3.364 2.448c-.783.57-1.838-.197-1.538-1.118l1.286-3.949a1 1 0 00-.364-1.118L2.07 9.375c-.783-.57-.38-1.81.588-1.81h4.155a1 1 0 00.95-.69l1.286-3.948z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.rating?.count} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-green-700">
              ${product.price}
            </span>
            <button
              onClick={handleButBtn}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
