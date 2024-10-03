import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getCookie } from "@/utils";
import { usePage, useReduxDispatch } from "@/hooks";
import { useLazyProfileQuery } from "@/redux/api/user.api";
import { handleWebsiteLoader } from "@/redux/slice/layout.slice";
import { RootLayoutProps } from "@/layouts/rootLayout/RootLayout.type";
import { useLazyGetSubscriptionPlanQuery } from "@/redux/api/subscription.api";

export const useAuth = ({ pageType, roles, module }: RootLayoutProps) => {
  const { isAdminDashboard } = usePage();
  const router = useRouter();
  const token = getCookie("token");
  const dispatch = useReduxDispatch();

  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(true);
  const [error, setError] = useState(false);

  const [getProfile, { data: profile }] = useLazyProfileQuery();
  const [getSubscriptionPlan] = useLazyGetSubscriptionPlanQuery();

  useEffect(() => {
    if (!loading) dispatch(handleWebsiteLoader(loading));
  }, [loading]);

  useEffect(() => {
    if (!token && pageType === "protected")
      router.replace("/lawyer/auth/login");
    else if (token && pageType === "auth")
      router.replace("/lawyer/dashboard/home");
    else if (!token) setLoading(false);
    else if (profile && pageType === "protected") {
      let isPermission: Boolean | null = null;
      if (module && isPermission !== false)
        isPermission =
          profile.modules[module.id]?.permissions[module.permission];
      if (roles && isPermission !== false)
        isPermission = roles?.includes(profile.role);
      setPermission(!!isPermission);
    }
  }, [router.pathname, profile]);

  useEffect(() => {
    (async () => {
      try {
        if (!token) return;
        const response = await getProfile().unwrap();
        // if (response.role !== "superAdmin")
        //   await getSubscriptionPlan().unwrap();
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (
    isAdminDashboard &&
    profile &&
    profile.role === "admin" &&
    !profile.isSubscribed &&
    !loading
  ) {
    setLoading(true);
    setTimeout(
      () => router.replace("/subscription").finally(() => setLoading(false)),
      500
    );
  }

  if (isAdminDashboard && profile && profile.role === "customer" && !loading) {
    setLoading(true);
    router.replace("/");
  }

  return {
    isLoading: pageType === "public" ? false : loading,
    isPermission: pageType !== "protected" ? true : permission,
    isError: error,
  };
};
