var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load the checkin page.
  app.get("/report/:id", function (req, res) {
    console.log("/report");
    let reportObj = {
      day_id: req.params.id
    };
    console.log(reportObj);
    res.render("report", { data:reportObj });
  });

  // Load the challenge completed page.
  app.get("/completed", function (req, res) {
    console.log("/completed");
    res.render("completed", {});
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
