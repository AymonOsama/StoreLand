import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // <-- استيراد

export default function CartPage() {
  const { cartProduct = [], setCartProduct } = useProduct();
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(cartProduct)) {
      setCartItems(cartProduct);
    }
  }, [cartProduct]);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    setCartProduct(updatedItems);
    sessionStorage.setItem("cartProduct", JSON.stringify(updatedItems));
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateCart(updatedItems);
    toast.info("Product Deleted From Ur Cart", {
      theme: "light",
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleQuantityChange = (id, type) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const quantity = item.quantity || 1;
        const newQuantity = type === "inc" ? quantity + 1 : quantity > 1 ? quantity - 1 : 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedItems);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleChechOutBtn = () => {
    if (user.name === "Guest") {
      toast.warn("You Must Login First", {
        theme: "light",
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/home");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.7 }}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, "dec")}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, "inc")}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-xl"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handleChechOutBtn}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
