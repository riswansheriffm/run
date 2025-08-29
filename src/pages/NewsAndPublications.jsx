import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/component/newsAndPublications/Hero";
import { useEffect } from "react";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import NewCarousel from "../components/component/newsAndPublications/NewCarousel";
import LatestPressRelease from "../components/component/newsAndPublications/LatestPressRelease";
import Loader from "../components/ui/loader/Loader";

const NewsAndPublications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("newsAndPublication"));
    dispatch(fetchPageContent("latestPublication"));
    dispatch(fetchPageContent("latestGovernorSpeeches"));
    dispatch(fetchPageContent("latestPressRelease"));
  }, [dispatch]);

  const newsAndPublicationContent = useSelector(
    (state) => state.pageContent.newsAndPublication
  );

  const latestPublication = useSelector(
    (state) => state.pageContent.latestPublication
  );

  const latestPressRelease = useSelector(
    (state) => state.pageContent.latestPressRelease
  );

  const latestGovernorSpeeches = useSelector(
    (state) => state.pageContent.latestGovernorSpeeches
  );

  if (
    !newsAndPublicationContent ||
    !latestPublication ||
    !latestPressRelease ||
    !latestGovernorSpeeches
  ) {
    <Loader />;
  }

  const eventData = newsAndPublicationContent?.data?.events;

  const heroSection = {
    left: newsAndPublicationContent?.data?.heroSection,
    right: newsAndPublicationContent?.data?.contactDetails,
  };

  const latestNews = newsAndPublicationContent?.data?.category;

  return (
    <>
      <section id="hero" data-bg="dark">
        <Hero heroSection={heroSection} eventData={eventData} />
        <div className="lg:px-10">
          <LatestPressRelease
            latestNews={latestNews}
            latestPublication={latestPublication}
            latestPressRelease={latestPressRelease}
            latestGovernorSpeeches={latestGovernorSpeeches}
          />
        </div>
      </section>
    </>
  );
};

export default NewsAndPublications;
