import logo from "../../../assets/logo.png";
import { useEffect } from "react";

const Loader = ({ size = 80 }) => {
  // Disable scroll while loader is visible
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // restore scroll after unmount
    };
  }, []);

  return (
    <div className="fixed flex-col gap-2 inset-0 z-50 bg-white/5 flex items-center justify-center pointer-events-auto">
      <img
        src={logo}
        alt="Loading..."
        className="animate"
        style={{ width: size, height: size }}
      />
      <div
        className="rounded-full"
        style={{
          width: "10px",
          aspectRatio: "1",
          animation: "l5 1s infinite linear alternate",
        }}
      />
      {/* Custom animation keyframes */}
      <style>
        {`
          @keyframes l5 {
            0%   { box-shadow: 20px 0 #000, -20px 0 #0002; background: #000; }
            33%  { box-shadow: 20px 0 #000, -20px 0 #0002; background: #0002; }
            66%  { box-shadow: 20px 0 #0002, -20px 0 #000; background: #0002; }
            100% { box-shadow: 20px 0 #0002, -20px 0 #000; background: #000; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
