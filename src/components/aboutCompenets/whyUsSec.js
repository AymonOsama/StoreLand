import { Link } from "react-router-dom";
import photo1 from "../../assets/images/about1.jpg";
import photo2 from "../../assets/images/about2.jpg";
import photo3 from "../../assets/images/about3.jpg";

export default function WhyChooseUsSection() {
  return (
    <div className="w-full bg-gray-50 mx-auto px-4 sm:px-10 lg:px-20 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-center">
        
        {/* Left Side: Image Grid */}
        <div className="w-full lg:w-1/2 order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* First Column - Two images stacked */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg shadow-lg h-48 md:h-56">
                <img
                  src={photo1}
                  alt="Team collaborating on a project"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg h-48 md:h-56">
                <img
                  src={photo2}
                  alt="Customer receiving a package"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Second Column - One larger image */}
            <div className="overflow-hidden rounded-lg shadow-lg h-full min-h-96 sm:min-h-full">
              <img
                src={photo3}
                alt="Support representative wearing a headset and smiling"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Text Content and Button */}
        <div className="w-full lg:w-1/2 order-2">
          <div className="mb-6 lg:mb-8">
            <p className="text-blue-600 text-lg md:text-xl font-semibold mb-2">
              Why Choose Us
            </p>
            <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Make your customers happy by giving services
            </h2>
          </div>

          <div className="space-y-4 md:space-y-6">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              A seamless shopping experience starts with clear, engaging content and a clean layout. Our goal is to provide a smooth and enjoyable journey for every customer by showcasing our products in a way that's easy to browse and understand.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Choosing the right domain name is one of the first and most important steps in building a strong brand. Secure a name that reflects your store’s identity and leaves a professional impression that aligns with your brand image.
            </p>

            <div className="border-t border-gray-200 my-4 md:my-6"></div>

            <div className="text-left">
              <Link
                to="/home"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 md:py-3 md:px-8 rounded-lg transition duration-300 text-sm md:text-base"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}
