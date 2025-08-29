import React from "react";

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  className = "",
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch?.();
  };

  return (
    <div
      className={`flex items-center rounded-lg border border-gray-300 overflow-hidden ${className}`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1  font-h6 focus:outline-none py-1 px-4 placeholder-text-gray placeholder:font-normal"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-lightgray/30 font-bold transition"
      >
        <svg
          className="lg:w-6 lg:h-6 w-4 h-4  text-brown "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
