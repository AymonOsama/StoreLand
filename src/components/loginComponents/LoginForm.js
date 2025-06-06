// src/components/LoginForm.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "../../context/UserContext"; // ⬅️ import context

export default function LoginForm() {
    const [customers, setCustomers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser(); // ⬅️ access setUser

    useEffect(() => {
        axios.get('/data/customers.json')
            .then(res => setCustomers(res.data))
            .catch(err => console.error('Error fetching customers:', err));
    }, []);

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("rememberedUser"));
        const sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"));
    
        if (localUser) {
            setEmail(localUser.email);
            setPassword(localUser.password);
            setRememberMe(true); // ✅ لأن جاي من localStorage
            setUser(localUser); // ⬅️ sync user context
        } else if (sessionUser) {
            setEmail(sessionUser.email);
            setPassword(sessionUser.password);
            setRememberMe(false); // ✅ لأنه مش عامل Remember Me
            setUser(sessionUser); // ⬅️ sync user context
        }
        if (localUser || sessionUser) {
            navigate("/home"); // ✅ المستخدم مسجل بالفعل
        }
    }, [navigate, setUser]);
    

    const handleSigninbtn = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warn("Please fill in both email and password fields" , {theme: "light"});
            return;
        }

        const foundUser = customers.find(
            (cust) => cust.email === email && cust.password === password
        );

        if (foundUser) {
            const userData = {
                email: foundUser.email,
                password: foundUser.password,
                name: foundUser.name,
                id: foundUser.id
            };
            if (rememberMe) {
                localStorage.setItem("rememberedUser", JSON.stringify(userData));
                console.log("Saved to localStorage:", userData); // 🔍
                sessionStorage.removeItem("sessionUser");
            } else {
                sessionStorage.setItem("sessionUser", JSON.stringify(userData));
                console.log("Saved to sessionStorage:", userData); // 🔍
                localStorage.removeItem("rememberedUser");
            }


            setUser(userData); // ⬅️ update user context
            toast.success("Logged in successfully!" , {theme:"light"});
            setTimeout(() => {
                navigate("/home");
            }, 100); // بسيط delay عشان يظهر التوست
        } else {
            toast.error("❌ Invalid email or password" , {theme:"light"});
        }
    };
    
    const handleGuestLogin = () => {
        const guest = { email: "guest@store.com", name: "Guest" };
        sessionStorage.setItem("sessionUser", JSON.stringify(guest));
        setUser(guest); // ⬅️ update user context
        toast.info("Welcome, Guest!", { theme: "light" });
        navigate("/home");
    };

    return (
        <form className="mt-8" onSubmit={handleSigninbtn}>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm border border-gray-300 bg-gray-100 p-3 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-sm border border-gray-300 bg-gray-100 p-3 mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="mb-4 mt-2 flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-700">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2 border border-gray-400 rounded-sm"
                    /> Remember Me
                </label>
                <Link to="/forgetpass" className="text-blue-600 hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
                <button
                    type="submit"
                    className="w-full sm:flex-1 bg-blue-600 py-3 text-white rounded-sm hover:bg-blue-700 transition duration-300 mb-3 sm:mb-0"
                >
                    Sign In
                </button>
                <Link
                    to="/createaccount"
                    className="w-full sm:flex-1 bg-green-500 py-3 text-white text-center rounded-sm hover:bg-green-600 transition duration-300"
                >
                    Create Account
                </Link>
            </div>

            <button
                type="button" 
                onClick={handleGuestLogin} 
                className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded-sm hover:bg-gray-300 transition duration-300 mb-6"
            >
                Continue as Guest
            </button>

            <div className="flex flex-col items-center lg:items-start mb-5">
                <p className="text-gray-600">Login With</p>
                <div className="mt-3 flex gap-5">
                    <a href="https://www.facebook.com/aymanosama101" className="text-gray-800 hover:text-blue-600">Facebook</a>
                    <a href="https://www.x.com" className="text-gray-800 hover:text-blue-400">Twitter</a>
                    <a href="https://www.google.com" className="text-gray-800 hover:text-red-600">Google</a>
                </div>
            </div>
        </form>
    );
}
