import Loader from "../components/ui/loader/Loader";
import ActsAndRegulations from "../components/component/supervision/ActsAndRegulations";
import BankResolutions from "../components/component/supervision/BankResolutions";
import Hero from "../components/component/supervision/Hero";
import SupervisedInstitutions from "../components/component/supervision/SupervisedInstitutions";
import SupervisoryCirculars from "../components/component/supervision/SupervisoryCirculars";
import UnsupervisedInstitutions from "../components/component/supervision/UnsupervisedInstitutions";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Supervision = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("supervision"));
  }, [dispatch]);

  const supervisionContent = useSelector(
    (state) => state.pageContent.supervision
  );

  if (!supervisionContent) {
    return <Loader />;
  }

  const data = supervisionContent?.data;

  const heroCard = data?.heroCard;
  const actsAndRegulations = data?.actsAndRegulations;
  const supervisoryCirculars = data?.supervisoryCirculars;
  const supervisedInstitutions = data?.supervisedInstitutions;
  const unsupervisedInstitutions = data?.unsupervisedInstitutions;
  const bankResolutions = data?.bankResolutions;

  return (
    <>
      <Hero heroCard={heroCard} />
      <div className="lg:px-10">
        <ActsAndRegulations actsAndRegulations={actsAndRegulations} />
        <SupervisoryCirculars supervisoryCirculars={supervisoryCirculars} />
        <SupervisedInstitutions
          supervisedInstitutions={supervisedInstitutions}
        />
        <UnsupervisedInstitutions
          unsupervisedInstitutions={unsupervisedInstitutions}
        />
        <BankResolutions bankResolutions={bankResolutions} />
      </div>
    </>
  );
};

export default Supervision;
