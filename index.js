/**
 * Basic example demonstrating passport-steam usage within Express framework
 * This example uses Express's router to separate the steam authentication routes
 */
var express = require("express"),
  passport = require("passport"),
  util = require("util"),
  session = require("express-session"),
  path = require("path"),
  SteamStrategy = require("./lib/passport-steam").Strategy,
  authRoutes = require("./lib/auth");

var request = require("request");
require("dotenv").config();
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(
  new SteamStrategy(
    {
      returnURL: "https://steam-picker.herokuapp.com/auth/steam/return",
      realm: "https://steam-picker.herokuapp.com/",
      apiKey: process.env.STEAM_WEB_KEY
    },
    function(identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

var app = express();

app.use(
  session({
    secret: "your secret",
    name: "name of session id",
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Test API to send whatevs
app.get("/api/test", function(req, res) {
  res.json([{ user: req.user, test: "stuff" }]);
});

app.get("/api/account", ensureAuthenticated, function(req, res) {
  res.json([{ user: req.user }]);
});

app.get("/api/ownedgames", ensureAuthenticated, function(req, res) {
  // Calculate the Steam API URL we want to use
  var url =
    "http://api.steampowered.com/IPlayerService/GetOwnedGames/" +
    "v0001/?key=" +
    process.env.STEAM_WEB_KEY +
    "&include_played_free_games=1&include_appinfo=1&steamid=" +
    req.user.id;
  request.get(url, function(error, steamHttpResponse, steamHttpBody) {
    var body = JSON.parse(steamHttpBody);
    res.json([{ user: req.user, gamelist: body.response }]);
  });
});

app.get("/api/logout", function(req, res) {
  req.logout();
  //res.redirect("/");
});

// See views/auth.js for authentication routes
app.use("/auth", authRoutes);

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
} else {
  //build mode
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/public/index.html"));
  });
}

app.listen(process.env.PORT || 3001);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
