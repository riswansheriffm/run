import { useState, useEffect } from "react";
const baseUrl = import.meta.env.VITE_API_IMAGE_BASEURL;

const Faq = ({ data }) => {
  const [activeId, setActiveId] = useState(data?.FAQ?.[0]?.id || null);
  // Set default active FAQ on data load
  useEffect(() => {
    if (data?.FAQ?.length) {
      setActiveId(data.FAQ[0].id);
    }
  }, [data]);

  const toggleAccordion = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex my-4 lg:ml-[9%] relative lg:min-h-[700px] ">
      <div className="w-full lg:w-[50%] p-6 ">
        <div className="mb-8">
          <h1 className="font-h2 font-bold text-brown">{data?.title}</h1>
          <p className="text-gray mt-2 font-normal font-h6">
            {data?.description}
          </p>
        </div>

        <div className="space-y-2 overflow-y-auto max-h-[700px]  ">
          {data?.FAQ?.map((item, index) => (
            <div
              key={item.id}
              className=" rounded-md border-b-1 py-3 border-lightgray/20 "
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full text-left  pb-2 font-semibold cursor-pointer text-black/85 flex"
              >
                <span className="mr-6 text-darkgray/40 font-medium font-subtitle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex justify-between w-full text-darkgray font-medium">
                  <p className="font-subtitle">{item.question}</p>
                  <i
                    className={`text-lightgray font-light fa fa-chevron-${
                      activeId === item.id ? "up" : "down"
                    }`}
                  ></i>
                </div>
              </button>
              {activeId === item.id && (
                <div className="pl-10  text-gray w-[90%] font-normal font-h6">
                  {item?.answer ? item?.answer : "Answer will be updated soon."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className=" lg:absolute -z-50 -top-32 -right-40">
        <img
          src={baseUrl + data?.backgroundImage?.url}
          height={"80%"}
          width={"80%"}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Faq;
