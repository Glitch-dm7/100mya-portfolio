import TopHeading from "./Components/TopHeader";
import WorkCardCarousel from "./Components/WorkCardCarousel";

const FeatureWorkSection = () => {
  return (
    <section id="work" className="overflow-x-hidden bg-[#FFFCF2] py-16 md:py-24">
      <div className="px-6 md:px-16 lg:px-[80px]">
        <TopHeading
          title="Featured work"
          subTitle="Explore my work and discover the art of impactful design."
        />
      </div>
      <div className="min-w-0 max-w-full overflow-x-hidden px-3 md:px-4 lg:px-6 xl:px-8">
        <WorkCardCarousel />
      </div>
    </section>
  );
};

export default FeatureWorkSection;
