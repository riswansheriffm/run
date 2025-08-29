import MonetaryPolicy from "../components/component/coreFunctionality/MonetaryPolicy";
import Hero from "../components/component/coreFunctionality/Hero";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Supervision from "../components/component/coreFunctionality/Supervision";
import FinancialMarkets from "../components/component/coreFunctionality/FinancialMarkets";
import CurrencyManagement from "../components/component/coreFunctionality/CurrencyManagement";
import FinancialInfrastructureInnovation from "../components/component/coreFunctionality/FinancialInfrastructureInnovation";
import Loader from "../components/ui/loader/Loader";

const CoreFunctionality = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("coreFunctionality"));
    dispatch(fetchPageContent("monetaryLatest"));
    dispatch(fetchPageContent("supervisionLatest"));
  }, [dispatch]);

  const coreFunctionalityContent = useSelector(
    (state) => state.pageContent.coreFunctionality
  );

  const monetaryLatestContent = useSelector(
    (state) => state.pageContent.monetaryLatest
  );

  const supervisionLatestContent = useSelector(
    (state) => state.pageContent.supervisionLatest
  );

  const data = coreFunctionalityContent?.data;
  const heroDate = data?.heroCard;
  const currencyManagement = data?.currencyManagement;
  const financialInfrastructureInnovation =
    data?.financialInfrastructureInnovation;
  const financialMarkets = data?.financialMarkets;
  const monetaryPolicy = data?.monetaryPolicy;
  const supervision = data?.supervision;

  if (
    !coreFunctionalityContent ||
    !monetaryLatestContent ||
    !supervisionLatestContent
  ) {
    return <Loader />;
  }

  return (
    <>
      <Hero heroDate={heroDate} />
      <div className="lg:px-10">
        {monetaryPolicy?.isLatestMonetatyPolicyNeeded && (
          <MonetaryPolicy
            monetaryPolicy={monetaryPolicy}
            monetaryLatestContent={monetaryLatestContent}
          />
        )}
        {supervision?.isSupervisionNeeded && (
          <Supervision
            supervision={supervision}
            supervisionLatestContent={supervisionLatestContent}
          />
        )}
        <FinancialMarkets financialMarkets={financialMarkets} />
        <CurrencyManagement currencyManagement={currencyManagement} />
        <FinancialInfrastructureInnovation
          financialInfrastructureInnovation={financialInfrastructureInnovation}
        />
      </div>
    </>
  );
};

export default CoreFunctionality;
