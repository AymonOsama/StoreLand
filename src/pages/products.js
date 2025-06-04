import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';  // استيراد framer-motion
import ProductCard from '../components/productCatd'; // صححنا اسم الملف
import FilterSection from '../components/FilterSection';
import Pagination from '../components/Pagination';
import { useLocation } from "react-router-dom";

export default function Products() {
  // 1. حالة لتخزين كل المنتجات اللي جيناها من API
  const [products, setProducts] = useState([]);

  // 2. حالة للتحكم في ظهور مؤشر التحميل (Spinner)
  const [loading, setLoading] = useState(true);

  // 3. حالة لتخزين التصنيف اللي المستخدم اختاره (مثلاً: "electronics")
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 4. حالة لتخزين رقم الصفحة الحالية في الـ pagination
  const [currentPage, setCurrentPage] = useState(1);

  // 5. عدد المنتجات التي نريد عرضها في كل صفحة
  const productsPerPage = 12;

  //6. نجيب كلمة السيرش 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";


  // 6. لما الصفحة تحمل لأول مرة (Component Mount)، نجيب المنتجات من API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data); // axios يحط البيانات مباشرة في res.data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 7. لما يتغير الفلتر (selectedCategory)، نرجع الصفحة للصفحة الأولى (1)
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 8. نصفي المنتجات بناء على التصنيف اللي اختاره المستخدم
  // لو ما اختار شيء، نعرض كل المنتجات
  const filteredProducts = products
  .filter(product => {
    // أول حاجة: هل التصنيف مطابق (لو فيه تصنيف)
    if (selectedCategory && selectedCategory !== 'all') {
      if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // تاني حاجة: هل الاسم يحتوي على كلمة البحث (لو فيه سيرش)
    if (searchQuery) {
      if (!product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
    }

    return true; // لو عدى كل الفلاتر، نرجعه
  });


  // 9. نحسب عدد الصفحات الكلي اللي نحتاجه بناء على عدد المنتجات و12 منتج في كل صفحة
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // 10. نحسب بداية ونهاية المنتجات اللي نعرضها في الصفحة الحالية
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // 11. الـ JSX اللي بيرسم الصفحة:
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* جزء الفلاتر (Sidebar) */}
          <aside className="w-full lg:w-72 lg:sticky lg:top-4 lg:h-fit">
            <FilterSection
              title="Category"
              options={["men's clothing", "women's clothing", "electronics", "jewelery", "all"]}
              defaultSelected={selectedCategory ? [selectedCategory] : []}
              type="radio"
              onChange={setSelectedCategory} // لما يختار المستخدم فئة جديدة، نحفظها
            />
          </aside>

          {/* جزء عرض المنتجات */}
          <main className="flex-1">
            {loading ? (
              // لو بنجيب المنتجات، نعرض spinner (مؤشر تحميل)
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* شبكة المنتجات مع تأثير دخول باستخدام framer-motion */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                  {paginatedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="aspect-square flex"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        className="flex-1 hover:shadow-md transition-shadow"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* ترقيم الصفحات - Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                      }
                    }}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
