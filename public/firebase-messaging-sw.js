// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  //it is okay to share api key.. it only uniquely identify our project anyway they would be exposed in the client side
  // https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
  // omg you are a nerd how read all this code? reach me out @oyeTewari in that blue bird app
  apiKey: "AIzaSyA9nJE1u2zAP3TUhp3qq-UDIMLnTgLjUAw",
  projectId: "anonmsg-8471a",
  messagingSenderId: "921785911541",
  appId: "1:921785911541:web:9266b0b0ad6df2fac45dbc",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title || payload.data.title;
  const notificationOptions = {
    body: payload.notification.body || payload.data.subtitle || "",
    icon: "https://firebasestorage.googleapis.com/v0/b/yes-4-web.appspot.com/o/pontonos%2Ficons%2Fandroid-chrome-192x192.png?alt=media&token=35616a6b-5e70-43a0-9284-d780793fa076",
    data: payload.data,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
