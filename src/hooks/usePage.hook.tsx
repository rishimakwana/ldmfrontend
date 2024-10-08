import { useRouter } from "next/router";

export const usePage = () => {
  const router = useRouter();

  return {
    isDashboard:
      router.pathname.startsWith("/lawyer/dashboard") ||
      router.pathname.startsWith("/client/dashboard"),
    isCustomerDashboard: router.pathname.startsWith("/customer/"),
    isAdminDashboard: router.pathname.startsWith("/lawyer/dashboard") || router.pathname.startsWith("/client/dashboard"),
    isPdfMakerPage: router.pathname.startsWith("/pdf-maker/"),
  };
};
