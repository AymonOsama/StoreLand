import { useState, useEffect } from 'react';
import ProductCard from '../productCard';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';

export default function FeaturedProductsCom() {
    // حالة لتتبع الصفحة الحالية للعرض
    const [page, setPage] = useState(0);  
    
    // حالة لتخزين المنتجات بعد جلبها من API
    const [products, setProducts] = useState([]);
    
    // حالة لتحديد عدد المنتجات المعروضة في كل صفحة
    const [productsPerPage, setProductsPerPage] = useState(3);
    
    // حالة لعرض الـ Loading أثناء جلب البيانات
    const [loading, setLoading] = useState(true);

    // جلب البيانات من API فقط عند بداية تشغيل المكون
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                // نقوم بتصفية المنتجات بحيث تظهر فقط الفئة "electronics"
                setProducts(response.data.filter(product => product.category === "electronics"));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // تغيير عدد المنتجات المعروضة لكل صفحة بناءً على حجم الشاشة
    useEffect(() => {
        const handleResize = () => {
            let newProductsPerPage;
            if (window.innerWidth < 768) { 
                newProductsPerPage = 1; // لشاشات الهواتف
            } else if (window.innerWidth < 1150) { 
                newProductsPerPage = 2; // لشاشات التابلت
            } else { 
                newProductsPerPage = 3; // لأجهزة الكمبيوتر والشاشات الكبيرة
            }

            // تحديث عدد المنتجات لكل صفحة وإعادة تعيين الصفحة إلى 0 عند التغيير
            if (newProductsPerPage !== productsPerPage) {
                setProductsPerPage(newProductsPerPage);
                setPage(0); // إعادة الصفحة للبداية عند تغيير عدد المنتجات
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize); // متابعة تغير حجم الشاشة
        return () => window.removeEventListener("resize", handleResize); // تنظيف الحدث عند إلغاء المكون
    }, [productsPerPage]); // التحديث فقط عند تغيير productsPerPage

    // تحديد نطاق المنتجات التي يجب عرضها في الصفحة الحالية
    const startIndex = page * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const visibleProducts = products.slice(startIndex, endIndex);

    // الدالة التي تقوم بعرض الصفحة السابقة
    const handleLeftBtn = () => {
        if (page > 0) setPage(page - 1);
    };

    // الدالة التي تقوم بعرض الصفحة التالية
    const handleRightBtn = () => {
        if (endIndex < products.length) setPage(page + 1);
    };

    // إعدادات التمرير (Swipe) باستخدام مكتبة react-swipeable
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleRightBtn(), // تمرير لليسار يعني عرض الصفحة التالية
        onSwipedRight: () => handleLeftBtn(), // تمرير لليمين يعني عرض الصفحة السابقة
        preventDefaultTouchmoveEvent: true, // منع التمرير الافتراضي للصفحة
        trackTouch: true, // تتبع حركة اللمس
        trackMouse: false // إلغاء تتبع حركة الفأرة
    });

    if (loading) return <div className="text-center text-xl py-12">Loading...</div>;

    return (
        <section className="bg-gray-50 py-24 transition-all duration-500">
            {/* إضافة خاصية swipeHandlers لجعل التمرير يعمل على الأجهزة اللمسية */}
            <div {...swipeHandlers} className="flex flex-row gap-2 items-center justify-between sm:justify-center px-4 sm:px-8 lg:px-12">
                
                {/* السهم الأيسر للعودة للخلف */}
                <FaAngleLeft 
                    onClick={handleLeftBtn} 
                    className={`text-2xl sm:text-3xl font-bold 
                    ${page === 0 ? 'text-gray-400 cursor-default' : 'text-gray-700 hover:text-black cursor-pointer'}`}
                />

                <div className="max-w-7xl w-full mx-auto">
                    <div className="text-left mb-12 select-none px-4">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Discover our exclusive collection of electronics products.
                        </p>
                    </div>

                    {/* شبكة المنتجات المعروضة */}
                    <div className={`grid gap-6 transition-all duration-700
                        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                        
                        {visibleProducts.map((product) => (
                            <div key={product.id} className="transform transition-transform duration-500 hover:scale-105">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* السهم الأيمن للذهاب للأمام */}
                <FaAngleRight 
                    onClick={handleRightBtn} 
                    className={`text-2xl sm:text-3xl font-bold 
                    ${endIndex >= products.length ? 'text-gray-400 cursor-default' : 'text-gray-700 hover:text-black cursor-pointer'}`}
                />
            </div>
        </section>
    );
}
