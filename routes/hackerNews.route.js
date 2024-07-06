var express = require("express");
var router = express.Router();
const hackerNewsController = require("../controllers/hackerNews.controller");

router.get("/",hackerNewsController.getAllHackersNews);

router.get("/comments",hackerNewsController.getSortedByCommentsAndWithMoreThanFiveWords);

router.get("/points",hackerNewsController.getSortedByPointsAndWhitLessThanFiveWords);

router.post("/scrape",hackerNewsController.scrapedAndUpdateData);


module.exports = router;