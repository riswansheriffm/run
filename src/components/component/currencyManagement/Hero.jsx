import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";

const Hero = ({ heroData }) => {
  const data = [heroData];

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

export default Hero;
