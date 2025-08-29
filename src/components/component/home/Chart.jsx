import graph from "../../../assets/graph.png";
import graph2 from "../../../assets/Container.png";
import styles from "./styles.module.css";

const Chart = () => {
  return (
    <>
      <div className="m-4 lg:mx-[10%] flex flex-col gap-4">
        <div className="text-center">
          <h2 className="font-h2 font-bold text-brown text-center ">
            Empowering Uganda
          </h2>
        </div>
        <div className="flex  flex-col-reverse lg:flex-row justify-between items-center ">
          <div className="w-full flex flex-col items-center ">
            <div className="w-full">
              <h1 className=" font-h3 font-bold text-darkgray mb-2">
                CBR and the 7-Day Interbank Rate
              </h1>
              <p className="font-h6 text-gray">April 2025</p>
            </div>
            <div className=" my-8 flex justify-center  w-full">
              <iframe
                title="CBR_7Day & Overnight Rates"
                src="https://app.powerbi.com/reportEmbed?reportId=20d75f5c-f5f3-4cb1-8900-db15da9d546d&autoAuth=true&filterPaneEnabled=false&navContentPaneEnabled=false"
                className={`w-full h-[1100px] ${styles.responsiveIframe}`}
                // style={{ zoom: "50%" }}
                frameBorder="0"
                allowFullScreen
                scrolling="no" // ✅ hides scrollbars
              ></iframe>
            </div>
          </div>
          {/* <div className="w-full md:w-[40%]  lg:w-[30%] flex items-center justify-center p-6">
            <img src={graph} className="w-full lg:w-[70%]" />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Chart;
