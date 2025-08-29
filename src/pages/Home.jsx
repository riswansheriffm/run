import Navbar from "../components/component/navbar/Navbar";
import Footer from "../components/component/footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import HeroSection from "../components/component/home/HeroSection";
import ExchangeRate from "../components/component/home/ExchangeRate";
import LatestNews from "../components/component/home/LatestNews";
import { extractAndSortDocuments } from "../helper/latestNews";
import Quote from "../components/component/home/Quote";
import LatestCard from "../components/component/home/LatestCard";
import { getLatestPublicationAndPressRelease } from "../helper/latestCard";
import Faq from "../components/component/home/Faq";
import Chart from "../components/component/home/Chart";
import Loader from "../components/ui/loader/Loader";
// import homeContent2 from "../components/component/home/home.json";

const HomePage = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardResult, setCardResult] = useState([]);

  useEffect(() => {
    dispatch(fetchPageContent("home"));
    dispatch(fetchPageContent("publication"));
    dispatch(fetchPageContent("latestGovernorSpeeches"));
    dispatch(fetchPageContent("pressRelease"));
  }, [dispatch]);

  const homeContent = useSelector((state) => state.pageContent.home);
  const publicationContent = useSelector(
    (state) => state.pageContent.publication
  );

  const pressReleaseContent = useSelector(
    (state) => state.pageContent.pressRelease
  );

  const latestGovernorSpeeches = useSelector(
    (state) => state.pageContent.latestGovernorSpeeches
  );

  useEffect(() => {
    if (
      homeContent &&
      publicationContent &&
      pressReleaseContent &&
      latestGovernorSpeeches
    ) {
      setIsLoading(false);
    }
  }, [
    homeContent,
    publicationContent,
    pressReleaseContent,
    latestGovernorSpeeches,
  ]);

  const releaseContent = publicationContent?.data?.items;
  const pressReleaseData = pressReleaseContent?.data?.pressRelease;

  useEffect(() => {
    const fetchDocuments = async () => {
      if (Array.isArray(releaseContent) && Array.isArray(pressReleaseData)) {
        const documents = await extractAndSortDocuments(
          releaseContent,
          pressReleaseData
        );
        const cardDocument = await getLatestPublicationAndPressRelease(
          releaseContent,
          pressReleaseData
        );
        setResult(documents);
        setCardResult(cardDocument);
      } else {
        console.warn("Invalid input data for extractAndSortDocuments");
      }
    };

    fetchDocuments();
  }, [releaseContent, pressReleaseData]); // only run once on component mount

  const data = homeContent?.data;

  const heroSection = data?.heroSlider;
  const exchangeRates = data?.exchangeRates;
  const isLatestNewsNeeded = data?.isLatestNewsNeeded;
  const isGraphNeeded = data?.isGraphNeeded;
  const quote = data?.quote;
  const isLatestCardNeeded = data?.isLatestCardNeeded;
  const faqData = data?.FAQ;
  if (isLoading) return <Loader />;

  return (
    <>
      <section id="hero" data-bg="light">
        <HeroSection data={heroSection} />
        <div className="">
          <ExchangeRate data={exchangeRates} />

          {isLatestNewsNeeded && <LatestNews data={result} />}

          {isGraphNeeded && <Chart />}

          <Quote data={quote} />

          {isLatestCardNeeded && <LatestCard data={cardResult} />}

          <Faq data={faqData} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
