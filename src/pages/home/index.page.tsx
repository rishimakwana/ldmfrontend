import { Page } from "@/types";

const Home: Page = () => {
  return "Home";
};

Home.rootLayoutProps = {
  title: "Home",
  pageType: "public",
};

export default Home;
