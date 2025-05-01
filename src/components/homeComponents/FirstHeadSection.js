import React from 'react';
import photo from '../../assets/images/photoForFirstComInHome.png'
import { Link } from 'react-router-dom';

export default function FirstHeadSection(){
    return (
        // القسم الرئيسي للهيدر
        <section className="relative bg-cover bg-center bg-no-repeat h-[400px] md:h-[500px] flex items-center justify-center" 
            style={{ backgroundImage: `url(${photo})` }}
        >
            <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
            {/* محتوى النص المركزي مع إعدادات التنسيق */}
            <div className="relative text-center text-white max-w-2xl px-6 select-none">
                {/* نص الترويج */}
                <p className="text-sm font-semibold mb-2">Extra 30% Off Online</p>
                {/* العنوان الرئيسي */}
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Summer Season Sale</h1>
                {/* وصف قصير */}
                <p className="text-sm md:text-base mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel dolor pellentesque, varius elit quis, malesuada quam.
                </p>
                {/* زر الحث على الإجراء */}
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
