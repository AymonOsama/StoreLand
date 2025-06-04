import React from 'react';
import { motion } from 'framer-motion';

import SucessHistoryPhoto1 from '../assets/images/SucessHistoryPhotos/SucessHistoryPhoto1.jpg';
import SucessHistoryPhoto2 from '../assets/images/SucessHistoryPhotos/SucessHistoryPhoto2.jpg';
import SucessHistoryPhoto3 from '../assets/images/SucessHistoryPhotos/SucessHistoryPhoto3.jpg';
import SucessHistoryPhoto4 from '../assets/images/SucessHistoryPhotos/SucessHistoryPhoto4.jpg';
import SucessHistoryPhoto5 from '../assets/images/SucessHistoryPhotos/SucessHistoryPhoto5.jpg';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import { FiSun } from 'react-icons/fi';

const Section = ({ title, text, image, reverse }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 mb-20`}
  >
    <div className="w-full md:w-1/2">
      <img
        src={image}
        alt={title}
        className="rounded-xl shadow-lg object-cover w-full border-4 border-blue-100"
      />
    </div>
    <div className="w-full md:w-1/2 text-gray-700 space-y-4">
      <h3 className="text-2xl font-bold text-blue-700">{title}</h3>
      {text.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-[17px]">{paragraph}</p>
      ))}
    </div>
  </motion.div>
);

const revenueData = [
  { year: '2020', revenue: 5000 },
  { year: '2021', revenue: 25000 },
  { year: '2022', revenue: 75000 },
  { year: '2023', revenue: 200000 },
  { year: '2024', revenue: 600000 },
  { year: '2025', revenue: 1200000 },
];

const Conclusion = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="mt-20 bg-blue-50 rounded-xl p-10 shadow-lg text-center max-w-4xl mx-auto"
  >
    <h3 className="text-3xl font-bold text-blue-700 mb-6">The Growth Story Continues...</h3>
    <p className="text-gray-700 mb-10 text-lg leading-relaxed max-w-xl mx-auto">
      From humble beginnings to a million orders and counting, StoreLand’s journey is a testament to passion, persistence, and innovation. The future is bright — and this is just the beginning.
    </p>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>

    <div className="mt-16 flex items-center justify-center gap-4 text-blue-600 text-xl font-semibold">
      <FiSun size={28} />
      <p className="italic max-w-xl">
        "Success is not just about numbers — it's about the light you bring to your community, the problems you solve, and the legacy you build."
      </p>
    </div>
  </motion.div>
);

const SuccessStory = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <p className="text-blue-600 font-semibold uppercase tracking-wide mb-2">Success Story</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">The Journey of “StoreLand”</h2>
        <p className="text-gray-500 w-full md:w-2/3 mx-auto text-lg">
          From a garage-built storefront to a 7-figure online empire — here's how StoreLand became one of the fastest-growing e-commerce platforms in the region.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Section
          title="Chapter 1: The Frustration 🔥"
          reverse={false}
          image={SucessHistoryPhoto1}
          text={[
            "In 2020, during lockdown, Ali couldn't find basic products online with reliable delivery. Frustrated, he decided to build his own e-commerce platform — fast, local, and trusted.",
            "Armed with just $400, he started Clickify from his bedroom, selling essentials sourced from nearby suppliers in Cairo.",
          ]}
        />

        <Section
          title="Chapter 2: The First Launch 🚀"
          reverse={true}
          image={SucessHistoryPhoto2}
          text={[
            "Ali built the MVP in 3 weeks using React, Firebase, and Stripe. The first product? Hand sanitizer and masks.",
            "In the first 10 days, Clickify received 300+ orders — all delivered on foot by Ali and his cousin. The feedback was overwhelming.",
          ]}
        />

        <Section
          title="Chapter 3: The E-commerce Battlefield ⚔️"
          reverse={false}
          image={SucessHistoryPhoto3}
          text={[
            "Competition arrived quickly. Logistics failed. A supplier disappeared mid-sale. Trust was fragile, and refund demands piled up.",
            "Ali had to rebuild the delivery system, implement live inventory tracking, and add 24/7 chat support — all within two months.",
          ]}
        />

        <Section
          title="Chapter 4: Scaling Smart 📈"
          reverse={true}
          image={SucessHistoryPhoto4}
          text={[
            "Clickify secured a small investor round, expanded to Jordan and Saudi Arabia, and partnered with 50+ verified vendors.",
            "The platform added AI-based product suggestions, personalized emails, and multi-language support. Sales doubled each quarter.",
          ]}
        />

        <Section
          title="Chapter 5: From Hustle to Brand 💼"
          reverse={false}
          image={SucessHistoryPhoto5}
          text={[
            "By 2024, Clickify was processing over 20,000 monthly orders. It launched a seller dashboard, a mobile app, and fulfilled its 1 millionth order.",
            "Ali now shares his story in startup summits, proving that even small ideas — if executed with grit — can disrupt entire industries.",
          ]}
        />

        <Conclusion />
      </div>
    </section>
  );
};

export default SuccessStory;
