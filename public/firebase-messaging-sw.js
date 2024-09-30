importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')



firebase.initializeApp({
  apiKey: "AIzaSyBplRmhSUTIk2lMs7OeOvtF6Wu-aEEJXZY",
  authDomain: "ems-test-d6cd0.firebaseapp.com",
  projectId: "ems-test-d6cd0",
  storageBucket: "ems-test-d6cd0.appspot.com",
  messagingSenderId: "562265326888",
  appId: "1:562265326888:web:3d2d7bc1e3c697b2c0fc1d",
})


const messaging = firebase.messaging()
messaging.onBackgroundMessage(({ notification }) => { })