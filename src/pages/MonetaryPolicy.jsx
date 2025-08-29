import Hero from "../components/component/monetaryPolicy/Hero";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PolicyToolkit from "../components/component/monetaryPolicy/PolicyToolkit";
import StatementsAndReports from "../components/component/monetaryPolicy/StatementsAndReports";
import Loader from "../components/ui/loader/Loader";

const MonetaryPolicy = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("monetaryPolicy"));
  }, [dispatch]);

  const monetaryPolicyContent = useSelector(
    (state) => state.pageContent.monetaryPolicy
  );

  if (!monetaryPolicyContent) {
    return <Loader />;
  }

  const data = monetaryPolicyContent?.data;
  const heroCard = data?.heroCard;
  const policyToolkit = data?.policyToolkit;
  const statementsAndReports = data?.statementsAndReports;

  return (
    <>
      <div className="lg:px-10">
        <Hero heroCard={heroCard} />

        <PolicyToolkit policyToolkit={policyToolkit} />
        <StatementsAndReports statementsAndReports={statementsAndReports} />
      </div>
    </>
  );
};

export default MonetaryPolicy;
