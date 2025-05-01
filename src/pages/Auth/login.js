// src/pages/LoginPage.jsx
import LoginHeader from "../../components/loginComponents/LoginHeader";
import LoginForm from "../../components/loginComponents/LoginForm";
import Photo from "../../assets/images/onlineStorePhoto2.jpg";

export default function Login() {
    return (
        <div 
            className="loginPage flex min-h-screen items-center justify-center p-4" 
            style={{ background: 'linear-gradient(to right, #2563EB 40%, #F9FAFB 40%)' }}
        >
            <div className="flex w-full max-w-4xl overflow-hidden rounded-md bg-white shadow-lg flex-col lg:flex-row">
                
                {/* Left Side - Image Section */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-600 items-center justify-center">
                    <img src={Photo} alt="Login Illustration" className="h-full w-full object-cover" />
                </div>

                {/* Right Side - Login Form Section */}
                <div className="w-full p-8 sm:p-12 lg:w-1/2 flex flex-col justify-center">
                    <LoginHeader />
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
