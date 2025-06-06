import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaEdit, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
    // State to store customer data and loading status
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to get user ID from session or local storage
    const getUserId = () => {
        const sessionUser = sessionStorage.getItem("sessionUser");
        const localUser = localStorage.getItem("rememberedUser");
        const userData = sessionUser || localUser;

        if (!userData) return null;

        try {
            const user = JSON.parse(userData);
            return user.id;
        } catch (err) {
            console.error("Failed to parse user data:", err);
            toast.error("Error in user data!");
            return null;
        }
    };

    // Fetch customer data when component mounts
    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;

        setIsLoading(true);
        axios.get("/data/customers.json")
            .then(res => {
                const foundCustomer = res.data.find(c => String(c.id) === String(userId));
                if (foundCustomer) {
                    setTimeout(() => {
                        setCustomer(foundCustomer);
                        setIsLoading(false);
                    }, 800); // Simulate network delay
                } else {
                    toast.warning(`No customer found with ID (${userId})`);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.error("Error fetching customer list:", err);
                toast.error("Error loading data.");
                setIsLoading(false);
            });
    }, []);

    // Handle edit button click
    const handleEdit = () => {
        toast.info("Edit feature not implemented yet!");
    };

    return (
        // Main container with gradient background
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6 md:p-12 flex items-center justify-center">
            {/* Animated profile card */}
            <motion.div
                className="bg-white shadow-xl rounded-3xl w-full max-w-4xl p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Loading state */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-gray-600 text-lg">Loading data...</p>
                    </div>
                ) : customer ? (
                    // Profile content when data is loaded
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* Profile picture section */}
                        <div className="relative">
                            <img
                                src={customer.avatar}
                                alt="User avatar"
                                className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-100 shadow-md object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='30' fill='%23e2e8f0'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%23bfdbfe'/%3E%3C/svg%3E";
                                }}
                            />
                            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                                <FaUser className="text-lg" />
                            </div>
                        </div>

                        {/* Profile details section */}
                        <div className="flex-1 space-y-6">
                            {/* Name section */}
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{customer.name}</h2>
                                <div className="w-16 h-1 bg-blue-400 rounded-full"></div>
                            </div>

                            {/* Contact information */}
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="flex items-start gap-4 text-gray-700">
                                    <FaEnvelope className="text-blue-500 mt-1 text-lg flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-lg">{customer.email}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4 text-gray-700">
                                    <FaPhoneAlt className="text-green-500 mt-1 text-lg flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-lg">{customer.phone}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4 text-gray-700">
                                    <FaMapMarkerAlt className="text-red-400 mt-1 text-lg flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="text-lg">{customer.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Edit button */}
                            <div className="pt-4">
                                <button
                                    onClick={handleEdit}
                                    className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <FaEdit />
                                    <span>Edit Profile</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // State when no customer data is found
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <FaUser className="text-5xl mx-auto" />
                        </div>
                        <h3 className="text-xl text-gray-600">User data not found</h3>
                        <p className="text-gray-500 mt-2">Please make sure you're logged in</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}