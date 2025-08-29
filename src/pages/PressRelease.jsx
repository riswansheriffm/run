import Hero from "../components/component/pressRelease/Hero";
import InfoBanner from "../components/component/pressRelease/InfoBanner";
import PressReleaseContainer from "../components/component/pressRelease/PressReleaseContainer";
import { useEffect } from "react";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/loader/Loader";

const PressRelease = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("pressRelease"));
  }, [dispatch]);

  const pressReleaseContent = useSelector(
    (state) => state.pageContent.pressRelease
  );

  // 👇 Show loading or fallback until data is ready
  if (!pressReleaseContent) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const hero = pressReleaseContent?.data?.heroSlider;
  const note = pressReleaseContent?.data?.note;
  const pressReleaseData = pressReleaseContent?.data?.pressRelease;

  return (
    <>
      <Hero hero={hero} />
      <InfoBanner note={note} />
      <div className="lg:px-10">
        <PressReleaseContainer data={pressReleaseData} />
      </div>
    </>
  );
};

export default PressRelease;
