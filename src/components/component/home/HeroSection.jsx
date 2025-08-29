import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";
import React from "react";

const HeroSection = ({ data }) => {
  return (
    <>
      <CarouselComponent
        slides={data || []}
        duration={5000}
        overlayTextColor="text-white"
        overlayBg="bg-brown/85"
        isCompactLayout={true}
        isButtonNeeded={true}
      />
    </>
  );
};

export default HeroSection;
