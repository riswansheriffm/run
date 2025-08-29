export const ProgressiveBlur = ({ bg = "#000000" }) => {
  // This renders the stacked blur layers and a final gradient to hide edge artifacts.
  // Based on: https://kennethnym.com/blog/progressive-blur-in-css/
  const commonLayer = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const makeMask = (stops) => {
    const grad = `linear-gradient(${stops})`;
    return {
      WebkitMaskImage: grad,
      maskImage: grad,
    };
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "56%", // adjust to taste; matches your info bar area
        pointerEvents: "none",
      }}
    >
      {/* 1 */}
      <div
        style={{
          ...commonLayer,
          backdropFilter: "blur(1px)",
          ...makeMask(
            "to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 40%"
          ),
        }}
      />
      {/* 2 */}
      <div
        style={{
          ...commonLayer,
          backdropFilter: "blur(2px)",
          ...makeMask(
            "to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 50%"
          ),
        }}
      />
      {/* 3 */}
      <div
        style={{
          ...commonLayer,
          backdropFilter: "blur(4px)",
          ...makeMask(
            "to bottom, rgba(0,0,0,0) 15%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 60%"
          ),
        }}
      />
      {/* 4 */}
      <div
        style={{
          ...commonLayer,
          backdropFilter: "blur(8px)",
          ...makeMask(
            "to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%"
          ),
        }}
      />
      {/* 5 */}
      <div
        style={{
          ...commonLayer,
          backdropFilter: "blur(16px)",
          ...makeMask(
            "to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 90%"
          ),
        }}
      />
      {/* 6 */}
      <div
        style={{
          ...commonLayer,
          backdropFilter: "blur(32px)",
          ...makeMask(
            "to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%"
          ),
        }}
      />
      {/* Optional: gradient to hide bottom “glitching” */}
      <div
        style={{
          ...commonLayer,
          background: `linear-gradient(transparent, ${bg})`,
        }}
      />
    </div>
  );
};
