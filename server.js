const cheerio = require("cheerio");
const axios = require("axios");

axios.get("https://www.thescoreesports.com/home").then(res => {
  const $ = cheerio.load(res.data);
  const results = [];

  // Scrape articles
  $("[class*='NewsCard__container']").each((i, element) => {
    let headline = $(element).find("[class*='NewsCard__title']").text();
    let summary = $(element).find("[class*='NewsCard__content']").text();
    let url = "https://www.thescoreesports.com" + $(element).find("a").attr("href");
    let img = $(element).find("[class*='NewsCard__featureImage']").find("img").attr("src");

    results.push({
      headline,
      summary,
      url,
      img
    });
  });
});