"use client";

import React from "react";
import GoalRow from "../GoalRow";
const goalsData = [
  {
    id: "01",
    title: "Understanding Your Goals",
    description:
      "We start by getting to know you and your goals. We listen carefully to what you want to achieve online.",
  },
  {
    id: "02",
    title: "Crafting a Plan",
    description:
      "Next, we create a special plan just for you. It’s like a roadmap that shows us how to reach your goals.",
  },
  {
    id: "03",
    title: "Taking Action",
    description:
      "We roll up our sleeves and put the plan into action. This is where all the magic happens! We use our skills to make your online dreams come true.",
  },
  {
    id: "04",
    title: "Tracking Progress",
    description:
      "We don’t stop there. We keep an eye on how things are going and make tweaks to make sure everything’s on track. Your success is our success, and we’re here every step of the way!",
  },
];

// --- 3. Main Section Component ---
const StrategicGoals = () => {
  return (
    <section className="bg-white py-20 lg:py-[76px]">
      <div className="container mx-auto px-4">
        
        {/* --- Header Section --- */}
        <div className="mb-16">
          <h2 className="text-[#15151e] text-5xl lg:text-[72px] font-normal leading-[1.2] mb-6">
            Setting the Bar High with <br className="hidden lg:block" />
            <strong>Our Strategic Goals</strong>
          </h2>
          <p className="text-[#6a738e] text-xl max-w-4xl leading-relaxed">
            Discover the Microters approach in just four steps: We listen to your
            dreams, and then we work our digital magic to bring them to life!
          </p>
        </div>

        {/* --- Goals List Section --- */}
        <div className="flex flex-col">
          {goalsData.map((item, index) => (
            <GoalRow
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              isLast={index === goalsData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicGoals;