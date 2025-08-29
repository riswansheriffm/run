import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/component/financialInfrastructureInnovation/HeroSection";
import { useEffect } from "react";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import Faq from "../components/component/financialInfrastructureInnovation/Faq";
import Loader from "../components/ui/loader/Loader";
import LegalAndRegulatory from "../components/component/financialInfrastructureInnovation/LegalAndRegulatory";
import FinancialContainer from "../components/component/financialInfrastructureInnovation/FinancialContainer";

const FinancialInfrastructureInnovation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("financialInfrastructureInnovation"));
  }, [dispatch]);

  const financialInfrastructureInnovationContent = useSelector(
    (state) => state.pageContent.financialInfrastructureInnovation
  );

  const data = financialInfrastructureInnovationContent?.data;

  const heroCardData = data?.heroCard;
  const faqData = data?.faqSection;
  const overviewData = data?.overview;
  const legalAndRegulatoryFrameworkData = data?.legalAndRegulatoryFramework;
  const financialContainer = data?.specificLegalAndRegulatoryInstruments;
  if (!financialInfrastructureInnovationContent) {
    return <Loader />;
  }

  return (
    <>
      <HeroSection heroCardData={heroCardData} />
      <div className="px-4 lg:px-10">
        <Faq faqData={faqData} overviewData={overviewData} />
        <LegalAndRegulatory
          legalAndRegulatoryFrameworkData={legalAndRegulatoryFrameworkData}
        />
        <FinancialContainer financialContainer={financialContainer} />
      </div>
    </>
  );
};

export default FinancialInfrastructureInnovation;
