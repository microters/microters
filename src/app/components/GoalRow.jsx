'use client";'
const GoalRow = ({ id, title, description, isLast }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-start lg:items-center py-8 lg:py-8 gap-5 ${
        !isLast ? "border-b border-[#D4D7DF]" : ""
      }`}
    >
      {/* Column 1: Number (20% width) */}
      <div className="w-full lg:w-[20%] mb-2 lg:mb-0">
        <span className="text-[#feefeb] text-[80px] lg:text-[110px] font-bold leading-none block">
          {id}
        </span>
      </div>

      {/* Column 2: Title (30% width) */}
      <div className="w-full lg:w-[30%] mb-4 lg:mb-0">
        <h4 className="text-[#29375d] text-3xl font-bold leading-tight">
          {title}
        </h4>
      </div>

      {/* Column 3: Description (50% width) */}
      <div className="w-full lg:w-[50%]">
        <p className="text-[#6a738e] text-lg lg:text-xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GoalRow;