const TopFooter = (content) => {
  const data = content?.content;

  return (
    <>
      <div className="bg-lightBrown p-4">
        <div className="text-center text-brown">
          <p className="font-bold font-subtitle mb-1">
            {data?.contactDetails?.title}
          </p>
          <p className="font-h6 font-normal">{data?.contactDetails?.address}</p>
          <p className="font-h6 space-x-1 font-normal">
            <a
              href={`tel:${data?.contactDetails?.phoneNumber}`}
              className="hover:underline"
            >
              {data?.contactDetails?.phoneNumber}
            </a>{" "}
            <span className="text-[rgba(77,36,18,0.3)]">|</span>{" "}
            <a
              href={`tel:${data?.contactDetails?.fax}`}
              className="hover:underline"
            >
              {data?.contactDetails?.fax}
            </a>{" "}
            <span className="text-[rgba(77,36,18,0.3)]">|</span>{" "}
            <a
              href={`mailto:${data?.contactDetails?.email || "info@bou.or.ug"}`}
              className="hover:underline"
            >
              {data?.contactDetails?.email || "info@bou.or.ug"}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default TopFooter;
