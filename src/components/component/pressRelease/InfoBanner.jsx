import Banner from "../../../components/ui/banner/Banner";

const InfoBanner = (note) => {
  return (
    <>
      <Banner note={note?.note} />
    </>
  );
};

export default InfoBanner;
