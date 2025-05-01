import { useEffect, useRef, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingCart, HiMenuAlt3, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

export default function NavBar() {
    // ─── State & Refs ─────────────────────────────────────
    const [isOpen, setIsOpen] = useState(false); // mobile menu
    const [activeNav, setActiveNav] = useState("");
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [userIsOpen, setUserIsOpen] = useState(false);
    const searchRef = useRef(null);
    const userRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();

    // ─── Set Active Nav Item Based On Route ───────────────
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/home")) setActiveNav("Home");
        else if (path.includes("/products")) setActiveNav("Products");
        else if (path.includes("/about")) setActiveNav("AboutUs");
        else if (path.includes("/UserProfile")) setActiveNav("User");
        else if (path.includes("/cart")) setActiveNav("Cart");
    }, [location.pathname]);

    // ─── Close Dropdowns When Clicking Outside ─────────────
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current && !searchRef.current.contains(event.target) &&
                userRef.current && !userRef.current.contains(event.target)
            ) {
                setSearchIsOpen(false);
                setUserIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ─── Toggle Handlers ──────────────────────────────────
    const toggleSearch = () => setSearchIsOpen((prev) => !prev);
    const toggleUser = () => setUserIsOpen((prev) => !prev);

    // ─── Handle Navigation Buttons ────────────────────────
    const handleNavBtns = (section) => {
        setActiveNav(section);
        setIsOpen(false);
        setUserIsOpen(false);
        setSearchIsOpen(false);
    };

    // ─── Sign Out Logic ───────────────────────────────────
    const handleSignOutBtn = () => {
        localStorage.removeItem("rememberedUser");
        sessionStorage.removeItem("sessionUser");
        navigate("/login");
        toast.success("SignOut successfully!", { theme: "light" });
    };

    return (
        <nav className="bg-white w-full z-20 top-0 border-b border-gray-200 shadow-sm">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

                {/* ───── Logo ───── */}
                <div className="flex items-center gap-2">
                    <img src="/data/images/StoreLand.png" alt="StoreLand Logo" className="h-6 w-6" />
                    <span className="text-xl font-semibold text-black">StoreLand</span>
                </div>

                {/* ───── Desktop Navigation ───── */}
                <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
                    <li><Link to="/home" onClick={() => handleNavBtns("Home")} className={`${activeNav === "Home" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>Home</Link></li>
                    <li><Link to="/products" onClick={() => handleNavBtns("Products")} className={`${activeNav === "Products" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>Products</Link></li>
                    <li><Link to="/about" onClick={() => handleNavBtns("AboutUs")} className={`${activeNav === "AboutUs" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>About Us</Link></li>
                </ul>

                {/* ───── Icons + Desktop User Dropdown ───── */}
                <div className="flex items-center gap-6 text-xl text-gray-800">

                    {/* 🔍 Search Icon */}
                    <IoMdSearch
                        className={`cursor-pointer ${searchIsOpen ? "text-blue-600" : "hover:text-blue-600"}`}
                        onClick={toggleSearch}
                    />

                    {/* 🛒 Cart Icon */}
                    <HiOutlineShoppingCart
                        onClick={() => handleNavBtns("Cart")}
                        className={`cursor-pointer ${activeNav === "Cart" ? "text-blue-600" : "hover:text-blue-600"}`}
                    />

                    {/* 👤 User Icon - Desktop */}
                    <div ref={userRef} className="relative hidden md:block">
                        <button onClick={toggleUser} className="flex items-center gap-1 cursor-pointer text-xl text-gray-800 hover:text-blue-600">
                            <LuUserRound className={`${userIsOpen ? "text-blue-600" : "hover:text-blue-600"}`} />
                            {userIsOpen ? <HiChevronUp className="text-base" /> : <HiChevronDown className="text-base" />}
                        </button>
                        {userIsOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-30">
                                <p className="block px-4 py-2 text-sm text-gray-700">Hey ,{user?.name || "Guest"}</p>
                                <Link to="/UserProfile" onClick={() => handleNavBtns("User")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Profile</Link>
                                <button onClick={handleSignOutBtn} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                            </div>
                        )}
                    </div>

                    {/* 📱 Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                            {isOpen ? <HiX /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ───── Mobile Menu ───── */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col gap-5 text-sm font-medium text-gray-700">
                        <li><Link to="/home" onClick={() => handleNavBtns("Home")} className={`${activeNav === "Home" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>Home</Link></li>
                        <li><Link to="/products" onClick={() => handleNavBtns("Products")} className={`${activeNav === "Products" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>Products</Link></li>
                        <li><Link to="/about" onClick={() => handleNavBtns("AboutUs")} className={`${activeNav === "AboutUs" ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>About Us</Link></li>
                    </ul>

                    {/* 👤 User Dropdown - Mobile */}
                    <div className="mt-6" ref={userRef}>
                        <button
                            onClick={toggleUser}
                            className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-md text-gray-700"
                        >
                            <span className="flex items-center gap-2">
                                <LuUserRound />
                                User
                            </span>
                            {userIsOpen ? <HiChevronUp /> : <HiChevronDown />}
                        </button>

                        {userIsOpen && (
                            <div className="mt-2 border border-gray-200 rounded-md shadow-sm bg-white">
                                <p className="px-4 py-2 text-sm text-gray-700">Hey, {user?.name || "Guest"}</p>
                                <Link
                                    to="/UserProfile"
                                    onClick={() => handleNavBtns("User")}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    User Profile
                                </Link>
                                <button
                                    onClick={handleSignOutBtn}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 🔍 Search Input Box */}
            {searchIsOpen && (
                <div ref={searchRef} className="px-4 pb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
        </nav>
    );
}
