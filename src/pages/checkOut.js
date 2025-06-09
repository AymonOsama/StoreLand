import { useEffect, useRef, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // ✅ الاستيراد

export default function CheckOut() {
  const { cartProduct, setCartProduct } = useProduct();
  const { user } = useUser();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const orderCompletedRef = useRef(false);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cartProduct") || "[]");
    if (
      !orderCompletedRef.current &&
      (!cartProduct || cartProduct.length === 0) &&
      storedCart.length === 0
    ) {
      toast.dismiss();
      toast.warn("Your cart is empty.");
      navigate("/home");
    }
  }, [cartProduct, navigate]);

  useEffect(() => {
    if (!user?.name) return;
    axios
      .get("/data/customers.json")
      .then((res) => {
        const match = res.data.find((c) => c.name === user.name);
        if (match) setTimeout(() => setCustomer(match), 800);
      })
      .catch(() => toast.error("Error loading customer info."));
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cartProduct.length) return;

    console.log("Order placed:", {
      ...formData,
      customer: user,
      items: cartProduct,
    });

    orderCompletedRef.current = true;
    setCartProduct([]);
    sessionStorage.removeItem("cartProduct");
    localStorage.removeItem("cartProduct");

    toast.success("Order confirmed, thank you!");
    navigate("/home");
  };

  const total = cartProduct.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <motion.section
      className="max-w-4xl mx-auto p-6 space-y-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Checkout
      </motion.h2>

      <motion.div
        className="bg-white p-4 rounded shadow"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
        <p><strong>Name:</strong> {customer?.name || "..."}</p>
        <p><strong>Email:</strong> {customer?.email || "..."}</p>
        <p><strong>Phone:</strong> {customer?.phone || "..."}</p>
      </motion.div>

      <motion.div
        className="bg-white p-4 rounded shadow"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          {cartProduct.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <p>{item.name}</p>
                <p className="text-gray-600">
                  {item.quantity || 1} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-semibold">
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
        <hr className="my-4" />
        <p className="text-lg font-bold text-right">
          Total: ${total.toFixed(2)}
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold mb-2">Delivery Details</h3>

        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="flex-1 border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="flex-1 border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Payment Method:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
              <input type="radio" name="paymentMethod" value="card" disabled />
              Card (Coming soon)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Confirm Order
        </button>
      </motion.form>
    </motion.section>
  );
}
