import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    // States for new password and confirmation
    const [newPassword, setNewPassword] = useState('');
    const [passwordRebet, setPasswordRebet] = useState('');
    const navigate = useNavigate();

    // Handle form submit
    const handleConfirmBtn = (e) => {
        e.preventDefault();

        // Validate if any field is empty
        if (!newPassword || !passwordRebet) {
            toast.warn("⚠️ Please fill in all fields");
            return;
        }

        // Check if passwords match
        if (newPassword !== passwordRebet) {
            toast.error("❌ The password doesn't match");
            return;
        }

        // Success flow
        toast.success("✅ Password reset successfully");
        navigate('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Reset Your Password
                </h2>

                <form onSubmit={handleConfirmBtn}>
                    {/* New Password Field */}
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <label className="block mb-1 text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setPasswordRebet(e.target.value)}
                        />
                    </div>

                    {/* Confirm Reset Button */}
                    <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300">
                        Confirm Reset
                    </button>
                </form>
            </div>
        </div>
    );
}
