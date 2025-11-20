"use client";
import React from "react";

const AppointmentScheduler = () => {
  return (
    <section className="w-full bg-[#192138] py-20 lg:py-28">
      <div className="container px-4">
        
        {/* --- Header Section --- */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-white text-4xl md:text-5xl lg:text-[72px] font-normal leading-[1.2] mb-6">
            Efficient Google Calendar <br className="hidden lg:block" />
            <strong>Appointment Scheduling</strong>
          </h2>
          <p className="text-white text-lg lg:text-xl font-bold opacity-90">
            Unleash the Power of Google Calendar for Effortless Appointment Coordination
          </p>
        </div>

        {/* --- Iframe Container --- */}
        <div className="w-full">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0wbpZ3h_jIFMm-NLexwKLkeIMTsiiaxNELaEq8K_8oJ8pLhcMLUK2FgEAcz61MJHdP7ckmo7mM?gv=true"
              width="100%"
              height="700"
              frameBorder="0"
              title="Microters Appointment Schedule"
              className="w-full border-0 min-h-[600px] lg:min-h-[750px]"
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppointmentScheduler;