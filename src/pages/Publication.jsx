import InfoBanner from "../components/component/publication/InfoBanner";
import Hero from "../components/component/publication/Hero";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PublicationContainer from "../components/component/publication/PublicationContainer";
import Loader from "../components/ui/loader/Loader";

const Publication = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("publication"));
  }, [dispatch]);

  const publicationContent = useSelector(
    (state) => state.pageContent.publication
  );

  if (!publicationContent) {
    return <Loader />;
  }

  const heroSlider = publicationContent?.data?.heroSlider;
  const infoBanner = publicationContent?.data?.note;
  const releaseContent = publicationContent?.data?.items;

  //git pushed

  return (
    <>
      <section id="heroPublic" data-bg="dark">
        <Hero heroSlider={heroSlider} />
        <InfoBanner infoBanner={infoBanner} />
        <div className="lg:px-10">
          <PublicationContainer releaseContent={releaseContent} />
        </div>
      </section>
    </>
  );
};

export default Publication;
