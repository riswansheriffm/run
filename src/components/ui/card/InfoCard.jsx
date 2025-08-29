import { useEffect, useState } from "react";
import { renderFirstPageToImage } from "../../../helper/renderPdfPage";
import UnderlineLink from "../button/UnderlineLink";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const InfoCard = ({
  imageSrc,
  title,
  description,
  className = "w-full h-full flex flex-col ",
  textSize = "",
  desClassName = "line-clamp-3 text-gray",
  cardContainerClassName = "py-4 lg:w-[212.5px]",
  imgClassName = "w-full h-40 sm:h-48 md:h-82 ",
  isDownloadNeeded = false,
  btnClassName = "",
  imageLink,
  name,
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdfImage = async () => {
      setLoading(true);
      if (imageSrc?.url?.endsWith(".pdf")) {
        try {
          const pdfImage = await renderFirstPageToImage(baseUrl + imageSrc.url);
          setPreviewImage(pdfImage);
        } catch (error) {
          console.error("Failed to render PDF:", error);
          setPreviewImage(null);
        }
      } else {
        setPreviewImage(baseUrl + imageSrc?.url);
      }
      setLoading(false);
    };

    if (imageSrc?.url?.endsWith(".pdf")) {
      loadPdfImage();
    } else {
      setLoading(false); // stop loader if no need to load PDF
    }
  }, [imageSrc]);

  return (
    <div className={`rounded-md overflow-hidden   ${className}`}>
      {loading ? (
        <div
          className={`h-50 lg:h-[116px]  bg-gray-200 animate-pulse rounded-xl`}
        />
      ) : (
        <div className={`relative flex   ${imgClassName}`}>
          <img
            src={
              previewImage ||
              (imageSrc?.url
                ? baseUrl + imageSrc.url
                : baseUrl + imageLink?.url)
            }
            alt={title}
            className="w-full h-50 lg:h-[116px] object-cover rounded-xl"
          />
        </div>
      )}

      <div className={`${cardContainerClassName}  flex flex-col `}>
        <h3 className={`${textSize} font-bold font-h6 text-brown mb-2`}>
          {title}
        </h3>
        <p
          className={` font-small ${desClassName} text-gray mb-2 flex-grow font-normal w-full`}
        >
          {description}
        </p>
        <div className="">
          <UnderlineLink
            isDownloadIconNeeded={isDownloadNeeded}
            name={name || (isDownloadNeeded ? "Download" : "Read more")}
            href={baseUrl + imageSrc?.url}
            className={btnClassName}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
