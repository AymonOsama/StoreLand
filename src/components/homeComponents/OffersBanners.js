import React from 'react';
import { Link } from 'react-router-dom';
import summerImage from '../../assets/images/summerImage.png';
import iphoneImage from '../../assets/images/iphoneImage.png';
import chairImage from '../../assets/images/chairImage.png'; // Import chair image

export default function OffersBanners() {
    return (
        <div className="w-full bg-white mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg shadow-md">

            {/* Left Large Banner */}
            <div className="bg-gray-200 md:py-20 md:px-12 p-6 rounded-sm flex flex-col shadow-md justify-between md:col-span-2 m-0 relative h-auto"> 
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
                    
                    {/* Text Section (3/4) */}
                    <div className="p-2 w-full md:w-2/4 text-center md:text-left"> {/* Center text on mobile */}
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Mega Sale Up To 50% Off For All</h2>
                        <p className="text-gray-600 mb-4 text-sm md:text-base md:pt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare vestibulum mollis. Nam vitae augue purus. Integer ac accumsan nunc.
                        </p>
                        {/* Added margin-top to push button down */}
                        <div className="mt-6 flex justify-center md:justify-start md:mt-12"> {/* Center button on mobile */}
                            <Link 
                                to={'/products'}
                                className="bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 max-w-max"
                            >
                                Grab The Offer
                            </Link>
                        </div>
                    </div>

                    {/* Chair Image (1/4) */}
                    <div className="w-full md:w-1/4 flex items-center justify-center ">
                        <img src={chairImage} alt="Chair Offer" className="w-[80%] h-auto object-contain" />
                    </div>
                </div>
            </div>

            {/* Right Side - Two Smaller Banners */}
            <div className="flex flex-col gap-6 h-full justify-between">

                {/* Top Right Banner - Image Left, Text Right */}
                <div className="relative h-[200px] md:h-[230px] rounded-sm overflow-hidden flex items-center bg-gray-200 shadow-md p-4">
                    <div className="w-1/3 h-full flex items-center justify-center p-1">
                        <img src={summerImage} alt="Summer Collection" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-2/3 p-2 flex flex-col justify-center text-right md:text-right"> {/* Text aligns right on mobile */}
                        <h3 className="font-bold text-2xl text-gray-900 mb-1">Summer Travel Collection</h3>
                        <Link 
                            to={'/products'}
                            className="text-sm text-blue-600 hover:underline pt-5"
                        >
                            Discover Now
                        </Link>
                    </div>
                </div>

                {/* Bottom Right Banner - Image Left, Text Right (Swapped) */}
                <div className="relative h-[200px] md:h-[230px] rounded-sm overflow-hidden flex items-center bg-gray-200 shadow-md p-4">
                    <div className="w-1/3 h-full flex items-center justify-center p-1">
                        <img src={iphoneImage} alt="iPhone Offer" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-2/3 p-2 flex flex-col justify-center text-right md:text-right"> {/* Text aligns right on mobile */}
                        <h3 className="font-bold text-2xl text-gray-900 mb-1 ">Get 30% Off On iPhone</h3>
                        <Link 
                            to={'/products'}
                            className="text-sm text-blue-600 hover:underline pt-5"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
