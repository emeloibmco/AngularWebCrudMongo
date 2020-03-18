var Movie = require('../model/clientes');

module.exports = function(app){
    
app.get("/api/customers", function(req, res, next) {
    console.log('listando Peliculas');
    Movie.find(function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
app.get("/api/customers/:id", function(req, res, next) {
  
    Movie.findById(req.params.id, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
app.post("/api/customers", function(req, res, next) { 
    console.log(req.body); 
    Movie.create(req.body, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
app.put("/api/customers/:id", function(req, res, next) {
    Movie.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
app.delete("/api/customers/:id", function(req, res, next) {
    Movie.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

}