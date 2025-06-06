import { FaApple, FaGooglePlay } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DownloadAppPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* صورة الموبايل */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1721955487745-a2c3aea86d1c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="App preview"
            className="w-full max-w-sm mx-auto drop-shadow-xl"
          />
        </motion.div>

        {/* النص والأزرار */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl font-extrabold mb-4 leading-tight text-white">
            حمل تطبيقنا الآن
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            استمتع بتجربة فريدة ومميزة مع تطبيقنا المتاح على أندرويد وآيفون.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="https://www.apple.com/app-store/"
              className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              <FaApple className="text-2xl" />
              <span>App Store</span>
            </a>

            <a
              href="https://play.google.com/"
              className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              <FaGooglePlay className="text-2xl" />
              <span>Google Play</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
