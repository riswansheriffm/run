import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";

const Hero = ({ heroSlider }) => {
  return (
    <>
      <CarouselComponent
        slides={heroSlider || []}
        duration={5000}
        overlayTextColor="text-white"
      />
    </>
  );
};

export default Hero;
