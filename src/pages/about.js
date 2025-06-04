// src/pages/About.js
import { motion } from "framer-motion";
import WhyUsSec from "../components/aboutCompenets/whyUsSec";
import BranchCard from "../components/aboutCompenets/ourAdv";

export default function About() {
  const sectionAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      // إضافة هذه الخاصية لمنع حدوث overflow خلال الحركة
      transitionEnd: { overflow: "hidden" }
    },
    transition: { duration: 0.6, ease: "easeInOut" }
  };

  return (
    // إضافة overflow-hidden هنا لمنع أي سكرول غير مرغوب فيه
    <div className="w-full bg-gray-300 py-6 overflow-hidden">
      <motion.div
        initial={sectionAnimation.initial}
        whileInView={sectionAnimation.animate}
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionAnimation.transition}
        // إضافة style لمنع أي overflow محتمل
        style={{ overflow: "hidden" }}
      >
        <WhyUsSec />
      </motion.div>

      <motion.div
        className="mt-6"
        initial={sectionAnimation.initial}
        whileInView={sectionAnimation.animate}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ ...sectionAnimation.transition, delay: 0.2 }}
        // إضافة style لمنع أي overflow محتمل
        style={{ overflow: "hidden" }}
      >
        <BranchCard />
      </motion.div>
    </div>
  );
}