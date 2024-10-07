import { Page } from "@/types";
import LoginComponent from "./components/login/Login.component";

const Login: Page = () => {

  return (
    <>
      <LoginComponent />
    </>
  );
};

Login.rootLayoutProps = {
  pageType: "auth",
  title: "Login",
  footer: false,
  header: false,
};

export default Login;
