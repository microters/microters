import trafficIcon from "@assets/images/icons/web-traffic.png"; 
import graphIcon from "@assets/images/icons/graph.png";
import planningIcon from "@assets/images/icons/planning.png";

// 2. Create data for SEO Page
export const seoWhyChooseData = {
  title: (
    <>
      Why Choose <strong className="font-extrabold">Professional SEO?</strong>
    </>
  ),
  description: (
    <>
      Wondering why isn’t your website bringing any traffic even though you’re publishing content consistently?
      <br className="hidden md:block" />
      Well, bringing traffic to your website is not just about how much content you publish but the quality of the content...
    </>
  ),
  features: [
    {
      id: 1,
      title: "Drive More Organic Traffic",
      description: "No matter what niche you’re in, getting high numbers of organic traffic is the ultimate target of our SEO services. No black-hat technique, guaranteed.",
      icon: trafficIcon,
    },
    {
      id: 2,
      title: "Futureproof Your Business Growth",
      description: "Mark your website safe from Google’s core algorithm updates! We follow proven SEO techniques that have little to no effect on major search engine shifts.",
      icon: graphIcon,
    },
    {
      id: 3,
      title: "Data-Driven Custom SEO Strategy",
      description: "Our SEO strategies are not focused on templates. First, we analyze your business type, and its audience, and then design SEO strategies based on specific findings.",
      icon: planningIcon,
    },
  ],
};

// 3. You can add more data sets here later (e.g., webDevWhyChooseData)