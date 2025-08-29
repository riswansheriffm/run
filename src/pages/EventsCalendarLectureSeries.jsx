import { useDispatch, useSelector } from "react-redux";
import CalendarCard from "../components/ui/card/CalendarCard";
import { useEffect } from "react";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import Loader from "../components/ui/loader/Loader";
import EventCard from "../components/component/eventCalendar/EventCard";
import Hero from "../components/component/eventCalendar/Hero";

const EventsCalendarLectureSeries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("calendarEvents"));
    dispatch(fetchPageContent("newsAndPublication"));
  }, [dispatch]);

  const calendarEventsContent = useSelector(
    (state) => state.pageContent.calendarEvents
  );
  const newsAndPublicationContent = useSelector(
    (state) => state.pageContent.newsAndPublication
  );

  if (!calendarEventsContent || !newsAndPublicationContent) {
    return <Loader />;
  }
  const eventData = newsAndPublicationContent?.data?.events;

  const data = calendarEventsContent?.data;

  const eventCard = data?.calendar;
  const hero = data?.heroSection;
  const eventSliderNeeded = data?.isEventSliderNeeded;
  return (
    <>
      <Hero
        hero={hero}
        eventData={eventData}
        isEventSliderNeeded={eventSliderNeeded}
      />
      <EventCard calendar={eventCard} />
    </>
  );
};

export default EventsCalendarLectureSeries;
