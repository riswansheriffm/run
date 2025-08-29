const CalendarCard = ({
  date,
  title,
  time,
  location,
  speaker,
  description,
  isActive, // optional manual override
}) => {
  const eventDate = new Date(date);
  const today = new Date();

  // Determine state
  const isPast = eventDate < today.setHours(0, 0, 0, 0);
  const isToday = eventDate.toDateString() === new Date().toDateString();
  const active = isActive || isToday;
  const upcoming = !isPast && !active;

  // Format date
  const day = eventDate.getDate();
  const monthYear = eventDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`transition-all duration-300 
              min-h-[260px] md:min-w-[226px] max-h-[260px] md:max-w-[226px] w-full
             `}
    >
      <div
        className={`text-center mb-2 mx-auto rounded-lg px-2 py-1.5 w-fit
        ${isPast && `border-dashed  border border-lightgray/50 text-lightgray`}
            ${upcoming && `bg-[#F8F8F8] `}
            ${active && `bg-gold text-white`}
        `}
      >
        <h1 className="text-lg font-semibold">{day}</h1>
        <p className="text-xs ">{monthYear}</p>
      </div>

      <div
        className={`min-h-[200px] max-h-[200px] space-y-2  p-4 rounded-lg ${
          isPast
            ? `bg-[#F5F5F5]
      bg-blend-overlay
      text-gray-500
      bg-[linear-gradient(135deg,_#ddd_25%,_transparent_25%,_transparent_50%,_#ddd_50%,_#ddd_75%,_transparent_75%,_transparent)]
      bg-[length:22px_22px]`
            : ""
        }
              ${
                upcoming
                  ? "bg-[#F5F5F5] hover:scale-110   hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.16)] transition-all duration-300 hover:bg-[#FFFFFF]"
                  : ""
              }
              ${active ? "bg-[#DA91331F] text-white  " : ""}`}
      >
        {/* Time */}
        <div
          className={`flex items-center gap-1 text-xs text-gray
            
            `}
        >
          <ClockIcon />
          <span className="text-[12px] ">{time}</span>
        </div>

        {/* Title */}
        <h1 className="text-sm font-semibold line-clamp-2 text-darkgray">
          {title}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray">
          <LocationIcon />
          <span className="text-[12px]">{location}</span>
        </div>

        {/* Speaker */}
        <div className="flex items-center gap-1 text-xs text-gray">
          <SpeakerIcon />
          <span className="line-clamp-1 text-[12px]">{speaker}</span>
        </div>

        {/* Description */}
        <hr className="my-1 text-lightgray/20" />
        <p className="text-xs line-clamp-3 text-lightgray">{description}</p>
      </div>
    </div>
  );
};

// ICONS (can be moved to separate components)
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
  >
    <path
      d="M7 2.25C9.8995 2.25 12.25 4.60051 12.25 7.5C12.25 10.3995 9.8995 12.75 7 12.75C4.10051 12.75 1.75 10.3995 1.75 7.5C1.75 4.60051 4.10051 2.25 7 2.25ZM6.56384 4.875C6.32221 4.875 6.12634 5.07088 6.12634 5.3125V7.9375C6.12634 8.17912 6.32221 8.375 6.56384 8.375H8.3125C8.55412 8.375 8.75 8.17912 8.75 7.9375C8.75 7.69588 8.55412 7.5 8.3125 7.5H7.00134V5.3125C7.00134 5.07088 6.80546 4.875 6.56384 4.875Z"
      fill="#929292"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
  >
    <path
      d="M6 1C8.48528 1 10.5 3.01472 10.5 5.5C10.5 7.36262 9.0802 9.31485 6.3 11.4C6.12222 11.5333 5.87778 11.5333 5.7 11.4C2.9198 9.31485 1.5 7.36262 1.5 5.5C1.5 3.01472 3.51472 1 6 1ZM6 4C5.17157 4 4.5 4.67157 4.5 5.5C4.5 6.32843 5.17157 7 6 7C6.82843 7 7.5 6.32843 7.5 5.5C7.5 4.67157 6.82843 4 6 4Z"
      fill="#929292"
    />
  </svg>
);

const SpeakerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
  >
    <path
      d="M6.65263 12.109L6.46451 12.7268C4.04197 12.5131 2.625 10.8598 2.625 9.25V8.8125C2.625 8.08763 3.21263 7.5 3.9375 7.5H7.90945C6.94749 8.1774 6.31903 9.29656 6.31903 10.5625C6.31903 11.113 6.43827 11.637 6.65263 12.109ZM7 1.8125C8.32894 1.8125 9.40625 2.88981 9.40625 4.21875C9.40625 5.54769 8.32894 6.625 7 6.625C5.67107 6.625 4.59375 5.54769 4.59375 4.21875C4.59375 2.88981 5.67107 1.8125 7 1.8125ZM13.125 10.5625C13.125 12.2539 11.7539 13.625 10.0625 13.625C9.52376 13.625 9.01751 13.4859 8.57772 13.2416L7.3599 13.6122C7.14681 13.6771 6.94763 13.4778 7.01251 13.2648L7.38328 12.0471C7.13908 11.6074 7 11.1012 7 10.5625C7 8.87113 8.37113 7.5 10.0625 7.5C11.7539 7.5 13.125 8.87113 13.125 10.5625ZM9.1875 9.25C8.94588 9.25 8.75 9.44588 8.75 9.6875C8.75 9.92912 8.94588 10.125 9.1875 10.125H10.9375C11.1791 10.125 11.375 9.92912 11.375 9.6875C11.375 9.44588 11.1791 9.25 10.9375 9.25H9.1875ZM8.75 11.4375C8.75 11.6791 8.94588 11.875 9.1875 11.875H10.0625C10.3041 11.875 10.5 11.6791 10.5 11.4375C10.5 11.1959 10.3041 11 10.0625 11H9.1875C8.94588 11 8.75 11.1959 8.75 11.4375Z"
      fill="#929292"
    />
  </svg>
);

export default CalendarCard;
