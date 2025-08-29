import React, { useState, useEffect } from "react";
import CurrencyStrip from "../../../components/ui/3dView/CurrencyStrip";
import ModelViewer from "../../../components/ui/3dView/ModelViewer";

const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const BanknotesAndCoins = ({ banknotesCoins }) => {
  const bg = baseUrl + banknotesCoins?.backgroundImage?.url;

  if (
    !banknotesCoins ||
    !Array.isArray(banknotesCoins.images) ||
    banknotesCoins.images.length === 0
  ) {
    return null; // or a fallback UI like <p>No data available</p>
  }
  const fullImageUrls = banknotesCoins.images.map((img) => baseUrl + img?.url);

  const [selectedModel, setSelectedModel] = useState(fullImageUrls[0]);

  return (
    <div className=" lg:mx-[8%] pt-8 lg:pt-[56px] flex flex-col gap-4 lg:gap-12">
      <div className="w-full lg:w-[80%] ">
        <h1 className="font-h2 font-bold text-brown mb-4">
          {banknotesCoins.title}
        </h1>
        <p className="font-h6 w-full lg:w-[60%] text-gray">
          {banknotesCoins.description}
        </p>
      </div>
      <div className="">
        <CurrencyStrip
          selectedIndex={fullImageUrls.indexOf(selectedModel)}
          onSelect={(url) => setSelectedModel(url)}
          images={fullImageUrls}
        />

        <ModelViewer modelPath={selectedModel} bgImg={bg} />
        <div className="flex w-full justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80 81"
            fill="none"
            className="w-10 h-10 lg:w-15 lg:h-15"
          >
            <g clip-path="url(#clip0_711_9763)">
              <path
                d="M46.6673 20.6695C46.6673 19.7855 46.3161 18.9376 45.691 18.3125C45.0659 17.6874 44.218 17.3362 43.334 17.3362H36.6673C35.7833 17.3362 34.9354 17.6874 34.3103 18.3125C33.6852 18.9376 33.334 19.7855 33.334 20.6695V40.6695C33.334 41.5536 33.6852 42.4014 34.3103 43.0265C34.9354 43.6517 35.7833 44.0028 36.6673 44.0028H43.334C44.218 44.0028 45.0659 43.6517 45.691 43.0265C46.3161 42.4014 46.6673 41.5536 46.6673 40.6695V34.0028C46.6673 33.1188 46.3161 32.2709 45.691 31.6458C45.0659 31.0207 44.218 30.6695 43.334 30.6695H33.334"
                stroke="#555555"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 17.3362H18.3333C19.6594 17.3362 20.9312 17.863 21.8689 18.8006C22.8065 19.7383 23.3333 21.0101 23.3333 22.3362V25.6695C23.3333 26.9956 22.8065 28.2674 21.8689 29.205C20.9312 30.1427 19.6594 30.6695 18.3333 30.6695M18.3333 30.6695H13.3333M18.3333 30.6695C19.6594 30.6695 20.9312 31.1963 21.8689 32.134C22.8065 33.0717 23.3333 34.3434 23.3333 35.6695V39.0028C23.3333 40.3289 22.8065 41.6007 21.8689 42.5384C20.9312 43.4761 19.6594 44.0028 18.3333 44.0028H10"
                stroke="#555555"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M56.666 24.0028V37.3362C56.666 39.1043 57.3684 40.8 58.6186 42.0502C59.8689 43.3005 61.5646 44.0028 63.3327 44.0028C65.1008 44.0028 66.7965 43.3005 68.0467 42.0502C69.297 40.8 69.9993 39.1043 69.9993 37.3362V24.0028C69.9993 22.2347 69.297 20.539 68.0467 19.2888C66.7965 18.0386 65.1008 17.3362 63.3327 17.3362C61.5646 17.3362 59.8689 18.0386 58.6186 19.2888C57.3684 20.539 56.666 22.2347 56.666 24.0028Z"
                stroke="#555555"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 54.0027C10 59.526 23.4333 64.0027 40 64.0027C56.5667 64.0027 70 59.526 70 54.0027"
                stroke="#555555"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_711_9763">
                <rect
                  width="80"
                  height="80"
                  fill="white"
                  transform="translate(0 0.669434)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BanknotesAndCoins;
