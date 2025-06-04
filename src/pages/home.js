import React from 'react';
import { motion } from 'framer-motion';

//import compenets
import FirstHeadSection from "../components/homeComponents/FirstHeadSection";
import FeaturedProductsCom from "../components/homeComponents/FeaturedProductsCom";
import DiscountBanner from "../components/homeComponents/DiscountBanner";
import OffersBanners from "../components/homeComponents/OffersBanners";
import TopRatingProductsSec from "../components/homeComponents/TopRatingProductsSec";

const heroVariants = {
  hidden: { opacity: 0, y: 20 }, // تقليل الإزاحة الرأسية
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeInOut"
    }
  }
};

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 10 }, // تقليل الإزاحة أكثر
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <div className="w-full bg-gray-300">
      {/* قسم الهيرو */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <FirstHeadSection />
      </motion.div>

      {/* حاوية الأقسام المتتالية */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={staggerContainerVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={staggerItemVariants}>
          <FeaturedProductsCom />
        </motion.div>

        <motion.div variants={staggerItemVariants}>
          <DiscountBanner />
        </motion.div>

        <motion.div variants={staggerItemVariants}>
          <OffersBanners />
        </motion.div>

        <motion.div variants={staggerItemVariants}>
          <TopRatingProductsSec />
        </motion.div>
      </motion.div>
    </div>
  );
}