import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";

const Hero = ({ heroCard }) => {
  const data = [heroCard];

  return (
    <>
      <CarouselComponent
        slides={data || []}
        duration={5000}
        overlayTextColor="text-white"
        overlayBg="bg-black/40"
        isGridNeeded={true}
        widthFull={true}
      />
    </>
  );
};

export default Hero;
