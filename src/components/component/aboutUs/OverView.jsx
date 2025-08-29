const OverView = (data) => {
  return (
    <>
      <div className="mx-4 lg:mx-[8%] py-4 lg:pb-[24px] lg:pt-[56px]">
        <div className="lg:w-[40%] w-full">
          <h1 className="  text-brown font-h2 font-bold">
            {data?.data?.overview?.title}
          </h1>
          <p className="font-normal text-gray font-h6 pt-2">
            {data?.data?.overview?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default OverView;
