import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";

const Hero = ({ heroDate }) => {
  const data = [heroDate];

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
