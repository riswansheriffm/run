import List from "./List";

const Container = ({ releases }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mx-4 lg:mx-[8%] py-8">
      {/* Left section - Image Card */}
      <div className="max-w-md w-full">
        <img
          src="/path-to-your/mps-december-2024.png"
          alt="Monetary Policy Statement"
          className="rounded-xl object-cover"
        />
      </div>

      {/* Right section - Press Releases */}
      <div className="flex-1">
        {/* Filter Tabs */}
        <div className="flex gap-3 flex-wrap mb-4">
          {["All", "Press Releases", "Press Briefing", "Governor Speeches"].map(
            (tab) => (
              <button
                key={tab}
                className="px-4 py-1 text-sm border rounded-full hover:bg-gray-100"
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* List */}
        <List releases={releases} />
      </div>
    </div>
  );
};

export default Container;
