import React from 'react';
import { motion } from 'framer-motion';
import FirstHeadSection from "../components/homeComponents/FirstHeadSection";
import FeaturedProductsCom from "../components/homeComponents/FeaturedProductsCom";
import DiscountBanner from "../components/homeComponents/DiscountBanner";
import OffersBanners from "../components/homeComponents/OffersBanners";
import TopRatingProductsSec from "../components/homeComponents/TopRatingProductsSec";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
};

export default function Home() {
    return (
        <div className="w-full max-w-screen overflow-x-hidden bg-gray-300">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <FirstHeadSection />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <FeaturedProductsCom />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <DiscountBanner />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <OffersBanners />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.2 }}
            >
                <TopRatingProductsSec />
            </motion.div>
        </div>
    );
}
