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
    icon: "https://citizensociolinguistics.files.wordpress.com/2017/04/screen-shot-2017-04-17-at-12-28-04-pm.png",
    data: payload.data,
  };

  self.addEventListener("notificationclick", function (event) {
    let url = "https://www.anonmsg.fun/";
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          // If so, just focus it.
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  });
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
