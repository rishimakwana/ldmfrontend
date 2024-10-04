import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getCookie } from "@/utils";
import { usePage, useReduxDispatch } from "@/hooks";
import { useLazyProfileQuery } from "@/redux/api/user.api";
import { handleWebsiteLoader } from "@/redux/slice/layout.slice";
import { RootLayoutProps } from "@/layouts/rootLayout/RootLayout.type";

export const useAuth = ({ pageType }: RootLayoutProps) => {
  const router = useRouter();
  const token = getCookie("token");
  const dispatch = useReduxDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [getProfile, { data: profile }] = useLazyProfileQuery();

  useEffect(() => {
    if (!loading) dispatch(handleWebsiteLoader(loading));
  }, [loading]);

  useEffect(() => {
    if (!token && pageType === "protected")
      router.replace("/lawyer/auth/login");
    else if (token && pageType === "public")
      router.replace("/lawyer/dashboard/home");
    else if (!token) setLoading(false);
    else if (profile && pageType === "protected") {

    }
  }, [router.pathname, profile]);


  useEffect(() => {
    (async () => {
      try {
        if (!token) return;
        await getProfile().unwrap();
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    isLoading: pageType === "public" ? false : loading,
    isError: error,
  };
};
