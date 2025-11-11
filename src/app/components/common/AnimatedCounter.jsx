"use client";

import React, { useEffect, useState, useRef } from 'react';

const AnimatedCounter = ({ endValue, duration = 1, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const finalValue = parseFloat(endValue);
    const animationDuration = duration * 1000;
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation();
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 } 
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [finalValue, duration]);

    const startAnimation = () => {
        let startTime;
        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / animationDuration, 1);
            
            const currentCount = Math.floor(percentage * finalValue);
            setCount(currentCount);

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(finalValue);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
    };

    return (
        <div ref={ref} className="flex items-start text-8xl md:text-[120px] lg:text-[160px] leading-none font-extrabold text-[#29375d]">
            <span>
                {count}
            </span>
            <span>{suffix}</span>
        </div>
    );
};

export default AnimatedCounter;