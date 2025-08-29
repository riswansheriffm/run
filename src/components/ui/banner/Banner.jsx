const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Banner = ({ note, bgColor = "gold", textColor = "text-white" }) => {
  return (
    <div
      className={`relative rounded-[37.944px] overflow-hidden mx-4 lg:mx-[8%] my-[24px] h-[200px]  ${
        bgColor === "gold" ? "bg-[#0162A8]" : "bg-brown"
      } `}
      style={{
        backgroundImage: `url(${baseUrl + note?.backgroundImage?.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      <div
        className={`${
          bgColor === "gold"
            ? // ? "bg[linear-gradient(90deg, #0162A8 -26.36%, #014798 54.03%, rgba(1, 79, 188, 0) 86.95%)]"
              "bg-[linear-gradient(90deg,#C6A13A_-26.36%,#C6831F_54.03%,rgba(198,131,31,0)_86.95%)]"
            : "bg-[linear-gradient(90deg,_#8A3F26_-26.36%,_#5A2E1C_55.17%,_rgba(90,46,28,0)_92.44%)] "
        } lg:py-12 lg:px-8 px-4 py-6  flex flex-col justify-center h-full ${textColor} `}
      >
        <p className="text-[12px] font-medium  opacity-80 md:w-[90%] uppercase ">
          {note?.subTitle}
        </p>
        <h5 className="text-xl lg:font-h3 font-bold mb-3 md:w-[80%]">
          {note?.title}
        </h5>
        <p className="font-h6 font-normal text-white/[72%]  max-w-2xl md:w-[70%] line-clamp-3 md:line-clamp-none">
          {note?.description}
        </p>
      </div>
    </div>
  );
};

export default Banner;
