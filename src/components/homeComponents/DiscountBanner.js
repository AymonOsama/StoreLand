import React from 'react';
import photo1 from '../../assets/images/DiscountBannerImg1.png'
import photo2 from '../../assets/images/DiscountBannerImg2.png'
import photo3 from '../../assets/images/DiscountBannerImg3.png'
import { Link } from 'react-router-dom';

export default function DiscountBanner() {
    return (
        <section className="relative w-screen h-[85vh] flex items-center justify-center overflow-hidden">

            {/* Image grid - Three images side by side */}
            <div className="relative flex w-full h-full overflow-hidden">
                
                {/* First Image */}
                <div className="w-1/3 h-full">
                    <img src={photo1} alt="Discount 1" className="w-full h-full object-cover" />
                </div>
                
                {/* Second Image */}
                <div className="w-1/3 h-full">
                    <img src={photo2} alt="Discount 2" className="w-full h-full object-cover" />
                </div>
                
                {/* Third Image */}
                <div className="w-1/3 h-full">
                    <img src={photo3} alt="Discount 3" className="w-full h-full object-cover" />
                </div>

                {/* Overlay layer to darken the images */}
                <div className="absolute inset-0 bg-gray-800 opacity-70"></div>
            </div>

            {/* Promotional text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
                <p className="text-sm font-semibold mb-2">Extra 50% Off Online</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Adidas Season Sale</h1>
                <p className="text-sm md:text-base mb-6 max-w-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel dolor pellentesque, varius elit quis, malesuada quam.
                </p>
                <Link 
                    to={'/products'}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                >
                    Shop Now
                </Link>
            </div>
        </section>
    );
}
