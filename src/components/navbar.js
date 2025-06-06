import { useEffect, useRef, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingCart, HiMenuAlt3, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [userIsOpen, setUserIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeNav, setActiveNav] = useState("");

    const searchRef = useRef(null);
    const userRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();

    useEffect(() => {
        const path = location.pathname;
        const routes = {
            "/home": "Home",
            "/products": "Products",
            "/about": "AboutUs",
            "/UserProfile": "User",
            "/cart": "Cart"
        };
        const matched = Object.entries(routes).find(([route]) => path.includes(route));
        setActiveNav(matched?.[1] || "");
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!searchRef.current?.contains(e.target) && !userRef.current?.contains(e.target)) {
                setSearchIsOpen(false);
                setUserIsOpen(false);
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavBtns = (section) => {
        setActiveNav(section);
        setIsOpen(false);
        setUserIsOpen(false);
        setSearchIsOpen(false);
    };

    const handleSignOutBtn = () => {
        localStorage.clear();
        sessionStorage.removeItem("sessionUser");
        navigate("/login");
        toast.success("SignOut successfully!", { theme: "light" });
    };

    const handleUserProfileAccess = () => {
        if (user.name === "Guest") {
            toast.warning("Please login to access your profile", { theme: "light" });
            navigate("/home");
        } else {
            handleNavBtns("User");
            navigate("/UserProfile");
        }
    };

    const navItems = [
        { name: "Home", path: "/home" },
        { name: "Products", path: "/products" },
        { name: "About Us", path: "/about" },
    ];

    return (
        <nav className="bg-white w-full z-20 top-0 border-b border-gray-200 shadow-sm">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <Link to="/home" className="flex items-center gap-2">
                    <img src="/data/images/StoreLand.png" alt="StoreLand Logo" className="h-6 w-6" />
                    <span className="text-xl font-semibold text-black">StoreLand</span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
                    {navItems.map(({ name, path }) => (
                        <li key={name}>
                            <Link to={path} onClick={() => handleNavBtns(name)} className={`${activeNav === name ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Icons */}
                <div className="flex items-center gap-6 text-xl text-gray-800">
                    <IoMdSearch className={`cursor-pointer ${searchIsOpen ? "text-blue-600" : "hover:text-blue-600"}`} onClick={() => setSearchIsOpen(!searchIsOpen)} />
                    <Link to="/cartpage"><HiOutlineShoppingCart onClick={() => handleNavBtns("Cart")} className={`cursor-pointer ${activeNav === "Cart" ? "text-blue-600" : "hover:text-blue-600"}`} /></Link>
                    {/* Desktop User */}
                    <div ref={userRef} className="relative hidden md:block">
                        <button onClick={() => setUserIsOpen(!userIsOpen)} className="flex items-center gap-1 cursor-pointer text-xl text-gray-800 hover:text-blue-600">
                            <LuUserRound className={userIsOpen ? "text-blue-600" : "hover:text-blue-600"} />
                            {userIsOpen ? <HiChevronUp className="text-base" /> : <HiChevronDown className="text-base" />}
                        </button>
                        {userIsOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-30">
                                <p className="block px-4 py-2 text-sm text-gray-700">Hey, {user?.name || "Guest"}</p>
                                <button onClick={handleUserProfileAccess} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Profile</button>
                                <button onClick={handleSignOutBtn} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                            {isOpen ? <HiX /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col gap-5 text-sm font-medium text-gray-700">
                        {navItems.map(({ name, path }) => (
                            <li key={name}>
                                <Link to={path} onClick={() => handleNavBtns(name)} className={`${activeNav === name ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6" ref={userRef}>
                        <button onClick={() => setUserIsOpen(!userIsOpen)} className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-md text-gray-700">
                            <span className="flex items-center gap-2"><LuUserRound /> User</span>
                            {userIsOpen ? <HiChevronUp /> : <HiChevronDown />}
                        </button>

                        {userIsOpen && (
                            <div className="mt-2 border border-gray-200 rounded-md shadow-sm bg-white">
                                <p className="px-4 py-2 text-sm text-gray-700">Hey, {user?.name || "Guest"}</p>
                                <button onClick={handleUserProfileAccess} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Profile</button>
                                <button onClick={handleSignOutBtn} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Search Input */}
            {searchIsOpen && (
                <div ref={searchRef} className="px-4 pb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                                setSearchIsOpen(false);
                                setIsOpen(false);
                                setSearchQuery('');
                            }
                        }}
                        className="w-full p-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
        </nav>
    );
}
