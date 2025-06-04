// import components
import ContactInfo from "../components/supportCompenets/ContactInfo";
import ContactForm from "../components/supportCompenets/ContactForm";
import { motion } from "framer-motion";

export default function Support() {
    return (
        <div className="w-full bg-gray-200 pt-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <ContactInfo />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            >
                <ContactForm />
            </motion.div>
        </div>
    );
}
