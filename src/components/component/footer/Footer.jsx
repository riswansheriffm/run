import MidFooter from "./MidFooter";
import TopFooter from "./TopFooter";

const Footer = (footerContent) => {
  const Content = footerContent?.footerContent?.data;

  return (
    <>
      <TopFooter content={Content} />
      <MidFooter content={Content} />
    </>
  );
};

export default Footer;
