import CtaSection from "app/components/common/CTA";
import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import LifeAtMicroters from "app/components/microters-culture/LifeAtMicroters";
import MeetOurHeroes from "app/components/microters-culture/MeetOurHeroes";
import PageHeader from "app/components/PageHeader";
import { officeGalleryData, tourGalleryData } from "app/data/galleryData";

export default function TeamPage() {
  return (
    <main>
      <PageHeader
        title="Microters Culture:"
        highlight="Innovation & Collaboration"
        description="Discover microters culture where innovation thrives and collaboration knows no bounds. Join us to ignite inspiration and achieve groundbreaking achievements."
      />
      <MeetOurHeroes/>
      <CtaSection/>
      <LifeAtMicroters/>
      <LifeAtMicroters 
        title={
            <>
            Memorable <strong>Moments</strong>
            </>
        }
        description="We love our memorable moments. We celebrate birthdays, team achievements, and enjoy annual tours and office parties. These events bring us closer and make our workplace fun and exciting."
        galleryData={officeGalleryData}
        />
      <LifeAtMicroters 
        title={
            <>
            Annual <strong>Tour</strong>
            </>
        }
        description="Our annual tour is a highlight of the year. It’s a time for the team to relax, explore new places, and bond outside the office. These trips are always filled with fun, laughter, and unforgettable memories."
        galleryData={tourGalleryData}
        />
       <div className="pt-16 lg:pt-20">
           <CtaBeforeFooter/>
       </div>
    </main>
  );
}