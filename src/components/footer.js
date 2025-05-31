import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                {/* Logo and Description */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/data/images/StoreLand.png" alt="StoreLand Logo" className="w-6 h-6" />
                        <span className="text-xl font-semibold text-gray-900">StoreLand</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Sed ut perspiciatis undminis is iste natus error sit amet voluptatem totam rem aperiam.
                    </p>
                    <p className="mt-4 text-sm text-gray-900 font-semibold">
                        📞 +011 (291) 499 72
                    </p>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link to="/UserStrategy" className="hover:text-blue-600">User Strategy</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link to="/contactsupport" className="hover:text-blue-600">Contact & Support</Link></li>
                        <li><Link to="/successhistory" className="hover:text-blue-600">Success History</Link></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link to="/knowourteam" className="hover:text-blue-600">Know Our Team</Link></li>
                        <li><Link to="/downloadapp" className="hover:text-blue-600">Download App</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-start">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Follow Us On</h4>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://facebook.com" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:opacity-80">
                            <FaFacebookF size={14} />
                        </a>
                        <a href="https://twitter.com" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-600">
                            <FaTwitter size={14} />
                        </a>
                        <a href="https://youtube.com" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-red-500">
                            <FaYoutube size={14} />
                        </a>
                        <a href="https://linkedin.com" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-800">
                            <FaLinkedinIn size={14} />
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">© 2025 StoreLand.</p>
                </div>
            </div>
        </footer>
    );
}