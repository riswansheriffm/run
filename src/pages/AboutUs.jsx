import OverView from "../components/component/aboutUs/OverView";
import Hero from "../components/component/aboutUs/Hero";
import OurMission from "../components/component/aboutUs/OurMission";
import OurMandate from "../components/component/aboutUs/OurMandate";
import GovernanceManagement from "../components/component/aboutUs/GovernanceManagement";
import BoardOfDirectors from "../components/component/aboutUs/BoardOfDirectors";
import HistoryAndLegacy from "../components/component/aboutUs/HistoryAndLegacy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import Loader from "../components/ui/loader/Loader";

const AboutUs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("aboutUs"));
  }, [dispatch]);

  const aboutUsContent = useSelector((state) => state.pageContent.aboutUs);

  if (!aboutUsContent) {
    return <Loader />;
  }

  const data = aboutUsContent?.data;

  return (
    <>
      <section id="hero" data-bg="dark">
        <Hero data={data} />
        <div className="px-1 lg:px-10">
          <OverView data={data} />
          <OurMission data={data} />
        </div>
        <OurMandate data={data} />
        <GovernanceManagement data={data} />
        <div className="lg:pl-10">
          <BoardOfDirectors data={data} />
          <HistoryAndLegacy data={data} />
        </div>
      </section>
    </>
  );
};

export default AboutUs;
