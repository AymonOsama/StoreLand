import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhoneVolume } from "react-icons/fa6";

const ContactInfo = () => {
  return (
    <div className="w-full bg-white py-32 px-4 sm:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row justify-center items-center gap-32 text-center">
        {/* Email */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
            <FaEnvelope className="text-blue-600" size={24} />
          </div>
          <h3 className="font-semibold text-lg">Email Address</h3>
          <div className="space-y-1 text-gray-600">
            <p><a href="mailto:info@example.com" className="hover:text-blue-600 transition-colors">info@example.com</a></p>
            <p><a href="mailto:support@example.com" className="hover:text-blue-600 transition-colors">support@example.com</a></p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
            <FaPhoneVolume className="text-blue-600" size={24} />
          </div>
          <h3 className="font-semibold text-lg">Phone Number</h3>
          <div className="space-y-1 text-gray-600">
            <p><a href="tel:+888001234567" className="hover:text-blue-600 transition-colors">+88 (800) 123 4567</a></p>
            <p><a href="tel:+990945445433" className="hover:text-blue-600 transition-colors">+99 094 5445 433</a></p>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
            <FaMapMarkerAlt className="text-blue-600" size={24} />
          </div>
          <h3 className="font-semibold text-lg">Our Address</h3>
          <p className="text-gray-600 leading-relaxed">
            82 12th Street, Office 14,<br />
            Edinburgh, UK
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
