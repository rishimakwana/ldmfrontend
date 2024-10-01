import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useReduxSelector } from "./redux.hook";
import { useUpdateFcmTokenMutation } from "@/redux/api/user.api";

export function useFcmToken() {
  const [token, setToken] = useState("");
  const { profile, isLoggedIn } = useReduxSelector((state) => state.layout);
  const [updateFcmToken] = useUpdateFcmTokenMutation();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", {
          scope: "/firebase-cloud-messaging-push-scope",
        })
        .then((registration) => {
          if (isLoggedIn) {
            retrieveToken();
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
              const { notification } = payload;
              console.log({ payload });
              // registration.showNotification('dfa', {})
            });
            return () => {
              unsubscribe();
            };
          }
        })
        .catch((error) => {
          console.error("Service Worker registration failed:\n\n", error);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (token && isLoggedIn && profile.fcmToken !== token) {
      updateFcmToken({ userId: profile.id, fcmToken: token });
    }
  }, [isLoggedIn, token]);

  async function retrieveToken() {
    try {
      const messaging = getMessaging(firebaseApp);
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        setToken(token);
      }
    } catch (error) {
      console.log("An error occurred while retrieving token:\n\n", error);
    }
  }
}

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});
