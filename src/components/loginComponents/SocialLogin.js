// src/components/SocialLogin.jsx
export default function SocialLogin() {
    return (
        <div className="flex flex-col items-center lg:items-start mb-5">
            <p className="text-gray-600">Login With</p>
            <div className="mt-3 flex gap-5">
                <a href="#" className="text-gray-800 hover:text-blue-600">Facebook</a>
                <a href="#" className="text-gray-800 hover:text-blue-400">Twitter</a>
                <a href="#" className="text-gray-800 hover:text-red-600">Google</a>
            </div>
        </div>
    );
}
