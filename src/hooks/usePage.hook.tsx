import { useRouter } from "next/router";

export const usePage = () => {
  const router = useRouter();

  return {
    isDashboard:
      router.pathname.startsWith("/lawyer/dashboard") ||
      router.pathname.startsWith("/customer/"),
    isCustomerDashboard: router.pathname.startsWith("/customer/"),
    isAdminDashboard: router.pathname.startsWith("/lawyer/dashboard"),
    isPdfMakerPage: router.pathname.startsWith("/pdf-maker/"),
  };
};
