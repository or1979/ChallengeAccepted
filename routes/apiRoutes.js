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

};
  
