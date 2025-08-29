import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";
import React from "react";

const Hero = (hero) => {
  return (
    <>
      <CarouselComponent
        slides={hero?.hero || []}
        duration={5000}
        overlayTextColor="text-white"
      />
    </>
  );
};

export default Hero;
