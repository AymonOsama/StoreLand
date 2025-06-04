import React from 'react';
// Icon imports remain the same
import { 
    FaThLarge,
    FaShieldAlt,
    FaShippingFast,
    FaUndoAlt,
    FaTags,
    FaHeadset
} from 'react-icons/fa';

// BranchCard component remains the same
const BranchCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="flex flex-col items-center mb-4">
        <div className="bg-blue-600 text-white p-3 rounded-lg mb-3">
          <div className="text-xl">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 text-center">{title}</h3>
      </div>
      <p className="text-gray-600 text-center flex-grow">{description}</p>
    </div>
  );
};

const OurBranches = () => {
  // Updated branches data with English titles and descriptions
  const branches = [
    {
      icon: <FaThLarge />,
      title: "Extensive Product Range",
      description: "Explore a vast catalog of products across diverse categories to find exactly what you're looking for."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "Shop with confidence using our industry-leading secure payment gateway. Your data is always protected."
    },
    {
      icon: <FaShippingFast />,
      title: "Fast & Reliable Delivery",
      description: "Get your orders delivered to your doorstep quickly and reliably, with multiple shipping options."
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns Process",
      description: "Not completely satisfied? Our hassle-free return policy makes it simple to get a refund or exchange."
    },
    {
      icon: <FaTags />,
      title: "Daily Deals & Discounts",
      description: "Enjoy unbeatable prices and discover new special offers every day on a wide range of products."
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions or concerns."
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* Section title in English */}
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Key Features</h2>
          {/* Other options for the title: "Why Shop With Us?", "Our Advantages" */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <BranchCard 
              key={index} // Using index as key; consider a unique ID if available
              icon={branch.icon}
              title={branch.title}
              description={branch.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBranches;