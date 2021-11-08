const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { allowedNodeEnvironmentFlags } = require("process");
const geolocation = require("./utils/geolocation");
const forecast = require("./utils/forecast");

const app = express();

//Nusistamoe kelius iki failu
const publicPath = path.join(__dirname, "../public"); // susikonstruojame kelia iki index.html public folderyje
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bar views and location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath)); //pasirenkame startine directorija serveriui, ten pasileidzia index.html ir visi kiti failai

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Gedas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Reikia pagalbos?",
    text: "lorem ipsum",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Apie programa",
    text: "Basiai gera programa",
    name: "Gedas",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.address;
  if (!location) {
    return res.send({
      error: "Jus turite ivesti lokacija",
    });
  }

 
  geolocation(location, (err, {latitude, longitude,location} = {}) => {
      if(err){
          return res.send({error})
      }
      forecast(latitude,longitude,(err,forecastData)=>{
        if(err){
          return res.send({error})
        }
      res.send({
        location: forecastData.lokacija,
        temperature: forecastData.temperatura,
        jutimine_t: forecastData.jutimine,
        
      });


      })
    
    
    
  });


});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gedas",
    error: "Help straipsnis nerastas 404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gedas",
    error: "Page not found 404",
  });
});

app.listen(3000, () => {
  console.log("Serveris sukasi ant 3000 porto");
});
