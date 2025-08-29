import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/component/currencyManagement/Hero";
import { useEffect } from "react";
import { fetchPageContent } from "../store/slice/pageContentSlice";
import BanknotesAndCoins from "../components/component/currencyManagement/BanknotesAndCoins";
import CleanMoneyPolicy from "../components/component/currencyManagement/CleanMoneyPolicy";
import Loader from "../components/ui/loader/Loader";

const CurrencyManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageContent("currencyManagement"));
  }, [dispatch]);

  const currencyManagementContent = useSelector(
    (state) => state.pageContent.currencyManagement
  );

  if (!currencyManagementContent) {
    return <Loader />;
  }

  const data = currencyManagementContent?.data;

  const heroData = data?.heroCard;
  const banknotesCoins = data?.banknotesCoins;
  const cleanMoneyPolicy = data?.cleanMoneyPolicy;

  return (
    <>
      <Hero heroData={heroData} />
      <div className="px-4 lg:px-10">
        <BanknotesAndCoins banknotesCoins={banknotesCoins} />
        <CleanMoneyPolicy cleanMoneyPolicy={cleanMoneyPolicy} />
      </div>
    </>
  );
};

export default CurrencyManagement;
