const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/steam", { target: "http://localhost:3001/" }));
  app.use(proxy("/api/*", { target: "http://localhost:3001/" }));
};
