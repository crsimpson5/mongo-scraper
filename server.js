const express = require("express");
const exphbs = require("express-handlebars");
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let articles = [];

const scrapeArticles = () => {
  axios.get("https://www.thescoreesports.com/home").then(res => {
    const $ = cheerio.load(res.data);
    const results = [];

    // Scrape articles
    $("[class*='NewsCard__container']").each((i, element) => {
      const headline = $(element).find("[class*='NewsCard__title']").text();
      const summary = $(element).find("[class*='NewsCard__content']").text();
      const url = "https://www.thescoreesports.com" + $(element).find("a").attr("href");
      const img = $(element).find("[class*='NewsCard__featureImage']").find("img").attr("src");

      results.push({
        headline,
        summary,
        url,
        img
      });
    });
    articles = results;
  });
};

scrapeArticles();

app.get("/", (req, res) => {
  res.render("index", { articles: articles });
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

