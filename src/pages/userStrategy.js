import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
// احذف السطر ده لو معندكش المكتبة دي
import { Download } from "lucide-react"; 

export default function UserStrategyPage() {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-24 min-h-screen font-sans">
      {/* عنوان الصفحة */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Your Strategy Dashboard 🚀
        </h1>
        <p className="text-gray-600 text-lg">
          Follow your progress, achievements, and recommendations.
        </p>
      </motion.div>

      {/* الإحصائيات */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {[
          { label: "Growth Rate", value: "26%", color: "text-green-600" },
          { label: "Fulfillment Rate", value: "99%", color: "text-blue-600" },
          { label: "Customer Score", value: "4.9 / 5", color: "text-yellow-600" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-md rounded-xl p-6 text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h4 className="text-sm text-gray-500">{item.label}</h4>
            <div className={`text-3xl font-bold mt-2 ${item.color}`}>{item.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* التقدم في الأهداف */}
      <motion.div
        className="bg-white max-w-5xl mx-auto rounded-xl p-8 shadow-md mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Your Progress</h2>
        <div className="space-y-5">
          {[
            { label: "Product Launch Plan", value: 75 },
            { label: "Marketing Campaign", value: 50 },
            { label: "Customer Loyalty Program", value: 90 },
          ].map((task, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{task.label}</span>
                <span>{task.value}%</span>
              </div>
              <Progress value={task.value} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* الإنجازات */}
      <motion.div
        className="bg-white max-w-5xl mx-auto rounded-xl p-8 shadow-md mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Achievements 🏆</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>1000+ Orders Completed in Q1</li>
          <li>Featured in Top 10 Stores</li>
          <li>Customer Retention ↑ 30%</li>
        </ul>
      </motion.div>

      {/* التوصيات */}
      <motion.div
        className="bg-blue-100 max-w-5xl mx-auto rounded-xl p-8 shadow-md mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Smart Recommendations 💡</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Automate social media posts</li>
          <li>Run seasonal promotions</li>
          <li>Collect customer feedback regularly</li>
        </ul>
      </motion.div>

      {/* زر التحميل */}
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download PDF Report
        </Button>
      </motion.div>
    </section>
  );
}
