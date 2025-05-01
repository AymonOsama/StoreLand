import { Link } from 'react-router-dom';
import photo3 from '../../assets/images/Forgot password.svg'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {

        const [email, setEmail] = useState('');
        const [customers, setCustomers] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            axios.get('/data/customers.json')
                .then(res => setCustomers(res.data))
                .catch(err => console.error('Error fetching customers:', err));
        }, []);

        const handleSignUpBtn = (e) => {
            e.preventDefault();

            const found = customers.some(
                (cust) => cust.email === email
            )

            if(found){
                toast.success("✅ Mussage Sent successfully!");
                    navigate('/forgetpasswordcode');
            }else{
                toast.error("❌ Invalid password");
            }
        };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-5xl overflow-hidden">
                
                {/* Left Section - Form */}
                <div className="w-full p-8 lg:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Forget Password</h2>
                    <p className="text-gray-600 mb-6">Enter your email address to reset your password.</p>
                    
                    <form className='mt-10' onSubmit={handleSignUpBtn}>
                        {/* Email Input */}
                        <label className="block text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="w-full p-4 border rounded mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        
                        {/* Reset Password Button */}
                        <button className="w-full mt-20 bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition duration-300">
                            Reset Password
                        </button>
                    </form>
                    
                    {/* Sign Up Link */}
                    <p className="mt-7 text-gray-600">
                        Don’t have an account? <Link to={'/createaccount'} className="text-blue-600 hover:underline">Sign Up</Link>
                    </p>
                </div>

                {/* Right Section - Illustration */}
                <div className="hidden lg:flex w-1/2 items-center justify-center">
                    <img src={photo3} alt="Forget Password Illustration" className="w-full h-auto object-contain" />
                </div>
            </div>
        </div>
    );
}
