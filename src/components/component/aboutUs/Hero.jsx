import CarouselComponent from "../../../components/ui/carousel/CarouselComponent";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Hero = ({ data }) => {
  return (
    <CarouselComponent
      slides={data?.heroSlider || []}
      imageBaseUrl={baseUrl}
      duration={5000}
      overlayTextColor="text-white"
      overlayBg="bg-black/40"
      font="black"
    />
  );
};

export default Hero;
