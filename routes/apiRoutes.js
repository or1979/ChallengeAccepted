var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Send the metrics to the completed page.
  app.get("/api/metrics", function (req, res) {
    console.log("/api/metrics");
    db.Metric.findAll({}).then(function (results) {
      //console.log(results);
      let retObj = {
        day_id: [],
        rbpm: [],
        bmi: [],
        blog: []
      }
      for (let i = 0; i < results.length; i++) {
        //console.log("id: " + i + " " + results[i].day_id);
        retObj.day_id.push(results[i].day_id);
        retObj.rbpm.push(results[i].rbpm);
        retObj.bmi.push(results[i].bmi);
        retObj.blog.push(results[i].blog);
      }
      //console.log(JSON.stringify(retObj));

      res.json(retObj);
    });
  });

};
