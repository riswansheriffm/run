import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";

const HeroSection = ({ heroCardData }) => {
  const data = [heroCardData];

  return (
    <>
      <CarouselComponent
        slides={data || []}
        duration={5000}
        overlayTextColor="text-white"
        overlayBg="bg-black/40"
      />
    </>
  );
};

export default HeroSection;
