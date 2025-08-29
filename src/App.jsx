import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPageContent } from "./store/slice/pageContentSlice";
import Navbar from "./components/component/navbar/Navbar";
import Footer from "./components/component/footer/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PressRelease from "./pages/PressRelease";
import Publication from "./pages/Publication";
import NewsAndPublications from "./pages/NewsAndPublications";
import ScrollToTop from "./ScrollToTop";
import Loader from "./components/ui/loader/Loader";
import FinancialInfrastructureInnovation from "./pages/FinancialInfrastructureInnovation";
import CurrencyManagement from "./pages/CurrencyManagement";
import CoreFunctionality from "./pages/CoreFunctionality";
import MonetaryPolicy from "./pages/MonetaryPolicy";
import Supervision from "./pages/Supervision";
import EventsCalendarLectureSeries from "./pages/EventsCalendarLectureSeries";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("nav")); // Navbar data
    dispatch(fetchPageContent("footer"));
  }, [dispatch]);

  const homeContent = useSelector((state) => state.pageContent.nav);
  const footerContent = useSelector((state) => state.pageContent.footer);

  if (!homeContent || !footerContent) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative">
        <Navbar homeContent={homeContent} />
        <main className="flex-grow">
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route
              path="/press_releases_media_briefings"
              element={<PressRelease />}
            />
            <Route path="/publications" element={<Publication />} />
            <Route
              path="/news_and_publications"
              element={<NewsAndPublications />}
            />
            <Route
              path="/financial_infrastructure_innovation"
              element={<FinancialInfrastructureInnovation />}
            />
            <Route
              path="/currency_management"
              element={<CurrencyManagement />}
            />
            <Route path="/core_functionality" element={<CoreFunctionality />} />
            <Route path="/monetary_policy" element={<MonetaryPolicy />} />
            <Route path="/supervision" element={<Supervision />} />
            <Route
              path="/events_calendar_lecture_series"
              element={<EventsCalendarLectureSeries />}
            />
          </Routes>
        </main>{" "}
        <Footer footerContent={footerContent} />
      </div>
    </>
  );
}

export default App;
