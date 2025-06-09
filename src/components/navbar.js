import { useEffect, useRef, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingCart, HiMenuAlt3, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

export default function NavBar() {
  // حالات الواجهة
  const [isOpen, setIsOpen] = useState(false); // قائمة الموبايل
  const [searchIsOpen, setSearchIsOpen] = useState(false); // بحث
  const [userIsOpen, setUserIsOpen] = useState(false); // قائمة المستخدم
  const [searchQuery, setSearchQuery] = useState(""); // نص البحث
  const [activeNav, setActiveNav] = useState(""); // العنصر النشط

  // الـ refs للكشف عن النقر خارج العنصر
  const searchRef = useRef(null);
  const userDesktopRef = useRef(null);
  const userMobileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // تحديث العنصر النشط بناءً على المسار
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const routes = {
      "/home": "Home",
      "/products": "Products",
      "/about": "AboutUs",
      "/userprofile": "User",
      "/cartpage": "Cart",
    };
    const matched = Object.entries(routes).find(([route]) => path.includes(route));
    setActiveNav(matched?.[1] || "");
  }, [location.pathname]);

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !searchRef.current?.contains(e.target) &&
        !userDesktopRef.current?.contains(e.target) &&
        !userMobileRef.current?.contains(e.target)
      ) {
        setSearchIsOpen(false);
        setUserIsOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // دالة لتحديث الحالة والتنقل (تستخدم في كل أماكن التنقل)
  const handleNavBtns = (section, path) => {
    setActiveNav(section);
    setIsOpen(false);
    setUserIsOpen(false);
    setSearchIsOpen(false);
    if (path) navigate(path);
  };

  // تسجيل خروج المستخدم
  const handleSignOutBtn = () => {
    localStorage.clear();
    sessionStorage.removeItem("sessionUser");
    navigate("/login");
    toast.success("SignOut successfully!", { theme: "light" });
  };

  // دخول صفحة الملف الشخصي مع التحقق من تسجيل الدخول
  const handleUserProfileAccess = () => {
    if (user.name === "Guest") {
      toast.warning("Please login to access your profile", { theme: "light" });
      navigate("/home");
    } else {
      handleNavBtns("User", "/UserProfile");
    }
  };

  // عناصر القائمة الرئيسية لتكرارها بسهولة
  const navItems = [
    { name: "Home", path: "/home", key: "Home" },
    { name: "Products", path: "/products", key: "Products" },
    { name: "About Us", path: "/about", key: "AboutUs" },
  ];

  return (
    <nav className="bg-white w-full z-20 top-0 border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* شعار الموقع */}
        <Link to="/home" className="flex items-center gap-2">
          <img src="/data/images/StoreLand.png" alt="StoreLand Logo" className="h-6 w-6" />
          <span className="text-xl font-semibold text-black">StoreLand</span>
        </Link>

        {/* القوائم في الديسكتوب */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          {navItems.map(({ name, path, key }) => (
            <li key={key}>
              <Link
                to={path}
                onClick={() => handleNavBtns(key)}
                className={activeNav === key ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* أيقونات البحث، السلة، المستخدم، والقائمة في الموبايل */}
        <div className="flex items-center gap-6 text-xl text-gray-800">
          {/* أيقونة البحث */}
          <IoMdSearch
            className={`cursor-pointer ${searchIsOpen ? "text-blue-600" : "hover:text-blue-600"}`}
            onClick={() => setSearchIsOpen(!searchIsOpen)}
          />

          {/* سلة التسوق */}
          <Link to="/cartpage">
            <HiOutlineShoppingCart
              onClick={() => handleNavBtns("Cart")}
              className={`cursor-pointer ${activeNav === "Cart" ? "text-blue-600" : "hover:text-blue-600"}`}
            />
          </Link>

          {/* المستخدم في الديسكتوب */}
          <div ref={userDesktopRef} className="relative hidden md:block">
            <button
              onClick={() => setUserIsOpen(!userIsOpen)}
              className="flex items-center gap-1 cursor-pointer text-xl text-gray-800 hover:text-blue-600"
            >
              <LuUserRound className={userIsOpen ? "text-blue-600" : "hover:text-blue-600"} />
              {userIsOpen ? <HiChevronUp className="text-base" /> : <HiChevronDown className="text-base" />}
            </button>

            {userIsOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-30">
                <p className="block px-4 py-2 text-sm text-gray-700">Hey, {user?.name || "Guest"}</p>
                <button
                  onClick={handleUserProfileAccess}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  User Profile
                </button>
                <button
                  onClick={handleSignOutBtn}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* أيقونة القائمة في الموبايل */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4" ref={userMobileRef}>
          <ul className="flex flex-col gap-5 text-sm font-medium text-gray-700">
            {navItems.map(({ name, path, key }) => (
              <li key={key}>
                <button
                  onClick={() => handleNavBtns(key, path)}
                  className={`w-full text-left ${activeNav === key ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>

          {/* قائمة المستخدم في الموبايل */}
          <div className="mt-6">
            <button
              onClick={() => setUserIsOpen(!userIsOpen)}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-md text-gray-700"
            >
              <span className="flex items-center gap-2">
                <LuUserRound /> User
              </span>
              {userIsOpen ? <HiChevronUp /> : <HiChevronDown />}
            </button>

            {userIsOpen && (
              <div className="mt-2 border border-gray-200 rounded-md shadow-sm bg-white">
                <p className="px-4 py-2 text-sm text-gray-700">Hey, {user?.name || "Guest"}</p>
                <button
                  onClick={handleUserProfileAccess}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  User Profile
                </button>
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

      {/* حقل البحث */}
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
                setSearchQuery("");
              }
            }}
            className="w-full p-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </nav>
  );
}
