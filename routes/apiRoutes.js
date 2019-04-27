var db = require("../models");


module.exports = function (app) {

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
    res.render("testFitness", {});
    console.log("testing123");
  });

  // Get all examples
app.get("/api/examples", function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
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
  
