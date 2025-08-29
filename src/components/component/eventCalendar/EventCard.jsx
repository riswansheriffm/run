import Category from "../../../components/ui/pressReleaseContainer/Category";
import CalendarCard from "../../../components/ui/card/CalendarCard";
import React, { useMemo, useState } from "react";

const quarters = ["Q1", "Q2", "Q3", "Q4"];

const getQuarterRange = (quarter) => {
  const year = new Date().getFullYear();
  switch (quarter) {
    case "Q1":
      return [new Date(year, 0, 1), new Date(year, 2, 31)]; // Jan - Mar
    case "Q2":
      return [new Date(year, 3, 1), new Date(year, 5, 30)]; // Apr - Jun
    case "Q3":
      return [new Date(year, 6, 1), new Date(year, 8, 30)]; // Jul - Sep
    case "Q4":
      return [new Date(year, 9, 1), new Date(year, 11, 31)]; // Oct - Dec
    default:
      return [null, null];
  }
};

const EventCard = ({ calendar }) => {
  const mainCategories = useMemo(
    () => calendar?.category?.map((item) => item.category),
    [calendar]
  );

  const [selectedMainCategory, setSelectedMainCategory] = useState(
    mainCategories[0]
  );
  const [selectedQuarter, setSelectedQuarter] = useState("Q1");

  const selectedCategoryData = useMemo(() => {
    return calendar?.category?.find(
      (item) => item.category === selectedMainCategory
    );
  }, [selectedMainCategory, calendar]);

  const [startDate, endDate] = getQuarterRange(selectedQuarter);

  // Filter events for the selected quarter
  const filteredEvents =
    selectedCategoryData?.events?.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    }) || [];

  // Sort future events to find the next one
  const now = new Date();
  const futureEvents = filteredEvents
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const nextEventId = futureEvents.length > 0 ? futureEvents[0].id : null;

  return (
    <div className="mx-4 lg:mx-[8%] py-8 lg:py-[80px]">
      {/* Main Category Filter */}
      <Category
        categories={mainCategories}
        selectedCategory={selectedMainCategory}
        setSelectedCategory={setSelectedMainCategory}
        mainCategory={true}
        justifyContent="left"
        isAllNeeded={false}
      />

      {/* Description */}
      <div className="mt-6">
        <p className="font-h6 text-gray">{selectedCategoryData?.description}</p>
      </div>

      {/* Quarter Filter */}
      <div className="mt-4">
        <Category
          categories={quarters}
          selectedCategory={selectedQuarter}
          setSelectedCategory={setSelectedQuarter}
          mainCategory={false}
          justifyContent="left"
          isAllNeeded={false}
        />
      </div>

      {/* Events */}
      <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {filteredEvents.map((event) => {
          const isActive = event.id === nextEventId;

          return (
            <CalendarCard
              key={event.id}
              date={event.date}
              time={`${formatTime(event.fromTime)} - ${formatTime(
                event.toTime
              )}`}
              title={event.title}
              location={event.location}
              speaker={event.designation}
              description={event.description}
              isActive={isActive}
            />
          );
        })}
      </div>
    </div>
  );
};

function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default EventCard;
