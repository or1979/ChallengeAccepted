var db = require("../models");

module.exports = function (app) {


  // Return true/false depending on whether challenge has been accepted.
  app.get("/api/accepted", function (req, res) {
    console.log("/api/accepted");

    db.SpiritTracker.findAll({}).then(function (result) {
      //console.log(result);
      console.log(result.length);
      let retObj = null;
      if (result.length == 0) {
        retObj = {
          started: false,
          data: result
        }
      }
      else {
        retObj = {
          started: true,
          data: result
        }
      }
      //console.log(retObj);
      res.json(retObj);

    });

  });

  // Accept the challenge.
  app.post("/api/accept_challenge", function (req, res) {
    console.log("/api/accept_challenge");
    console.log(req.body);

    db.SpiritTracker.create(req.body).then(function (result) {
      //console.log(result);
      res.json(result);
    });
  });

  // Update the checkin counter.
  app.put("/api/update_checkin", function (req, res) {
    console.log("/api/update_checkin");
    console.log("id : " + req.body.id);
    console.log("checkin_counter : " + req.body.checkin_counter);

    let putObj = {
      checkin_counter: req.body.checkin_counter,
      updatedAt: Date()
    };
    db.SpiritTracker.update(putObj,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        console.log(result);
        res.status(200).end();
      });

  });

  // Get the inspiration data for a specific day.
  app.get("/api/inspiration/:day", function (req, res) {
    console.log("/api/inspiration/:day");
    console.log("day = " + req.params.day);

    db.Inspiration.findOne({ where: { day_id: req.params.day } }).then(function (result) {
      //console.log(result);
      let retObj = {
        day_id: result.day_id,
        quote: result.quote,
        author: result.author,
        image_url: result.image_url
      };
      console.log(retObj);
      res.json(retObj);
    });

  });


  app.get("/fitness", function (req, res) {
    console.log("Orran's Link to fitness");
    res.render("Fitness", {});
    console.log("testing123");
  });

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
        mood: [],
        blog: []
      }
      for (let i = 0; i < results.length; i++) {
        //console.log("id: " + i + " " + results[i].day_id);
        retObj.day_id.push(results[i].day_id);
        retObj.rbpm.push(results[i].rbpm);
        retObj.bmi.push(results[i].bmi);
        retObj.mood.push(results[i].mood);
        retObj.blog.push(results[i].blog);
      }
      //console.log(JSON.stringify(retObj));

      res.json(retObj);
    });
  });

};

