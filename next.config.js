const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    apiKey: "AIzaSyA-cSOXbjbJpreIvO8klWFgnTL5cXL7gDI",
    authDomain: "sso-login-eb4e3.firebaseapp.com",
    projectId: "sso-login-eb4e3",
    storageBucket: "sso-login-eb4e3.appspot.com",
    messagingSenderId: "229894979483",
    appId: "1:229894979483:web:bd02c16c4806833b6a6b3e",
    measurementId: "G-8226WB0ZN",
  },
};
