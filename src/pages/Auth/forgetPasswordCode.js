import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photo3 from '../../assets/images/Forgot password.svg';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgetPasswordCode() {
    // OTP input fields state (6 empty inputs)
    const [code, setCode] = useState(new Array(6).fill(""));

    // Reference to input elements to control focus
    const inputsRef = useRef([]);

    // Loaded OTP codes from JSON file
    const [otbCode, setOtbCode] = useState();

    const navigate = useNavigate();

    // Fetch the valid codes when the component mounts
    useEffect(() => {
        axios.get('/data/forgetPasswordcodes.json')
            .then(res => setOtbCode(res.data))
            .catch(err => console.error('Error fetching OTP codes:', err));
    }, []);

    // Update code state on input change and move focus to next input
    const handleChange = (e, index) => {
        const value = e.target.value;

        // Allow only 1 alphanumeric character
        if (!/^[0-9a-zA-Z]{0,1}$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move focus to next input if not the last
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    // Handle form submission and verify entered code
    const handleConfirmBtn = (e) => {
        e.preventDefault();

        if (!otbCode) return;

        const enteredCode = code.join("");

        // Warn if any input field is empty
        if (enteredCode.length < 6 || code.includes("")) {
            toast.warn("\u26A0\uFE0F Please enter the full verification code");
            return;
        }

        // Check if code matches one from JSON
        const found = otbCode.some(item => item === enteredCode);

        if (found) {
            toast.success("\u2705 Verification successful");
            navigate('/resetpassword');
        } else {
            toast.error("\u274C Invalid verification code");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-5xl overflow-hidden">

                {/* Left Form Section */}
                <div className="w-full p-8 lg:w-1/2 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Enter the verification code</h2>
                    <p className="text-gray-600 mb-6">We have sent you a verification code to your email.</p>

                    <form className='mt-10' onSubmit={handleConfirmBtn}>
                        <label className="block text-gray-700 mb-4">Verification Code</label>

                        {/* OTP Input Fields */}
                        <div className="flex gap-3 justify-between mb-8">
                            {code.map((char, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                    value={char}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            ))}
                        </div>

                        <button className="w-full mt-10 bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition duration-300">
                            Confirm
                        </button>
                    </form>

                    {/* Link to create account */}
                    <p className="mt-7 text-gray-600">
                        Don’t have an account? <Link to='/createaccount' className="text-blue-600 hover:underline">Sign Up</Link>
                    </p>
                </div>

                {/* Right Illustration Section */}
                <div className="hidden lg:flex w-1/2 items-center justify-center">
                    <img src={photo3} alt="Forget Password Illustration" className="w-full h-auto object-contain" />
                </div>
            </div>
        </div>
    );
}
