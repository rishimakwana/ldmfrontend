import { Page } from "@/types";

const Home: Page = () => {
  return "Home Page";
};

Home.rootLayoutProps = {
  title: "Home",
  pageType: "protected",
};

export default Home;