"use client";

import React from "react";
const BRANDS_BG_SHAPE = "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"580\" height=\"698\" viewBox=\"0 0 580 698\" fill=\"none\"%3E%3Cpath d=\"M527.88 345.114L93.8693 692.822C207.98 927.231 616.633 1201.69 1067.22 936.998C962.866 853.978 904.348 739.703 884.842 708.449C724.111 797.524 559.74 745.564 497.646 708.449C557.464 660.59 702.069 544.362 801.941 462.319C881.526 365.43 835.101 269.582 801.941 233.77C752.525 193.399 622.485 86.8732 497.646 -16.267C662.472 -89.5199 782.435 -66.079 896.545 -16.267C928.535 -95.9662 1023.01 -197.283 1066.25 -237.979C590.299 -525.522 202.128 -202.818 92.894 1.31366L527.88 345.114Z\" fill=\"%231E2843\"/%3E%3Cpath d=\"M287.955 347.068L31.4493 144.89C-25.5085 294.912 7.71693 480.225 31.4493 554.129L287.955 347.068Z\" fill=\"%231E2843\"/%3E%3Cpath d=\"M1392 347.068C1392 107.97 1263.91 -72.9159 1199.86 -133.472C1116.64 -83.6597 950.187 116.565 950.187 347.068C950.187 611.95 1116.64 781.051 1199.86 832.491C1263.91 770.307 1392 586.165 1392 347.068Z\" fill=\"%231E2843\"/%3E%3C/svg%3E')";

const Brands = () => {
    return (
        <section 
            className="relative bg-[#192138] text-white overflow-hidden px-5 pt-[100px] pb-[250px]" 
        >
            <div
                className="absolute top-0 right-0 h-full w-full bg-no-repeat bg-contain bg-right z-10 hidden lg:block"
                style={{
                    backgroundImage: BRANDS_BG_SHAPE,
                    backgroundPosition: 'right center', 
                }}
            ></div>
            <div className="container mx-auto relative z-10">
                <h2 className="text-[72px] font-extrabold mb-4 leading-tight">
                    Get to Know<br/>
                    <strong className="font-extrabold">Our Family of Brands</strong>
                </h2>
                <div className="max-w-4xl">
                    <p className="app-paragraph text-white!">
                        Feeling overwhelmed by marketing tasks? No worries! We have the perfect solution to simplify your efforts and deliver exceptional results across all our sister concerns.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Brands;