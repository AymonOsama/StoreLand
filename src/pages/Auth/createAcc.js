import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import photo2 from '../../assets/images/Secure data.svg';

export default function CreateAcc() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-6xl overflow-hidden">
                
                {/* Left Section - Form */}
                <div className="w-full p-8 lg:w-1/2 flex flex-col justify-center">
                    {/* Title and description */}
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h2>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit .</p>

                    {/* Social Signup Options */}
                    <p className="text-1xl font-semibold text-blue-600 mt-10 mb-6">Sign Up With __</p>
                    
                    <div className="flex space-x-4 mb-4">
                        {/* Google Signup Button */}
                        <button className="flex-1 border p-3 rounded text-gray-700 flex items-center justify-center hover:border-blue-600 transition duration-300">
                            <FcGoogle className="w-6 h-6 mr-2" />
                            Sign up with Google
                        </button>
                        {/* Facebook Signup Button */}
                        <button className="flex-1 border p-3 rounded text-gray-700 flex items-center justify-center hover:border-blue-600 transition duration-300">
                            <FaFacebook className="w-6 h-6 mr-2 text-blue-600" />
                            Sign up with Facebook
                        </button>
                    </div>
                    
                    {/* Signup Form */}
                    <form className="my-3">
                        <div className="flex gap-6">
                            <div className="w-full">
                                {/* Username Input */}
                                <label className="block text-gray-700 mb-1">Username</label>
                                <input type="text" placeholder="Enter your username" className="w-full p-4 border rounded mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div className="w-full">
                                {/* Password Input */}
                                <label className="block text-gray-700 mb-1">Password</label>
                                <input type="password" placeholder="Enter your password" className="w-full p-4 border rounded mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                        <div className="my-3">
                            {/* Email Address Input */}
                            <label className="block text-gray-700 mb-1">Email Address</label>
                            <input type="email" placeholder="Enter your email address" className="w-full p-4 border rounded mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        
                        {/* Terms and Conditions Checkbox */}
                        <label className="flex items-center text-gray-600 mb-4">
                            <input type="checkbox" className="mr-2" />
                            I’ve read and agree with Terms of Service and our Privacy Policy
                        </label>
                        
                        {/* Create Account Button */}
                        <button className="w-full bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition duration-300 mt-4">
                            Create Account
                        </button>
                    </form>
                </div>

                {/* Right Section - Illustration */}
                <div className="hidden lg:flex w-1/2 items-center justify-center">
                    <img src={photo2} alt="SignUp Illustration" className="w-full h-auto object-contain" />
                </div>
            </div>
        </div>
    );
} 
