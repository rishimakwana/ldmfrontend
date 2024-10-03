import Head from "next/head";
import { Stack } from "@mui/material";

import Header from "./components/header/Header.component";
import Footer from "./components/footer/Footer.component";
import Sidebar from "./components/sidebar/Sidebar.component";
import WebsiteLoader from "@/components/websiteLoader/WebsiteLoader.component";
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary.component";
import FullPageMessage from "@/components/fullPageMessage/FullPageMessage.component";
import { RootLayoutProps } from "./RootLayout.type";
import { SIDEBAR_WIDTH } from "./RootLayout.config";
import {
  usePage,
  useNProgress,
} from "@/hooks";
import { getCookie } from "@/utils";
import { useAuth } from "./RootLayout.hook";

export default function RootLayout(
  props: RootLayoutProps & { children: React.ReactNode }
) {
  let { children, title, header, sidebar, footer } = props;
  const { isLoading, isError, isPermission } = useAuth(props);
  const { isCustomerDashboard, isAdminDashboard } = usePage();
  const ngProgress = useNProgress();
  const token = getCookie("token");
  const contentWidth = sidebar ? `calc(100vw - ${SIDEBAR_WIDTH}px)` : undefined;
  // useSetOrganization();
  // useFcmToken();

  if (!isAdminDashboard) sidebar = false;
  if (isAdminDashboard) (footer = false), (header = false);
  if (isCustomerDashboard) footer = false;

  const renderChildren = () => {
    if (!isPermission)
      return <FullPageMessage heading="404: Page Not Found" hideButton />;
    if (!token && props.pageType === "protected") return null;
    return children;
  };

  return (
    <>
      <Head>{title && <title>{`${title} | LDMS`}</title>}</Head>

      {isLoading ? (
        <WebsiteLoader />
      ) : (
        <>
          {sidebar !== false && <Sidebar />}
          <Stack flex={1} width={contentWidth}>
            {header !== false && <Header />}
            <Stack component="main" flex={1} mb={isAdminDashboard ? 3 : 0}>
              <ErrorBoundary error={isError}>{renderChildren()}</ErrorBoundary>
            </Stack>
            {footer !== false && <Footer />}
          </Stack>
        </>
      )}

      {ngProgress}
    </>
  );
}
