const scrapeHackerNewsService = require("../services/scrapeHackerNews.service");
const hackerNewsModel = require("../models/hackerNews.model");

const getAllHackersNews = async (req, res, next) => {
    try {
        const results = await hackerNewsModel.find();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const getSortedByCommentsAndWithMoreThanFiveWords = async (req, res, next) => {
    try {
        const results = await hackerNewsModel.getSortedByCommentsAndWithMoreThanFiveWords();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const getSortedByPointsAndWhitLessThanFiveWords = async (req, res, next) => {
    try {
        const results = await hackerNewsModel.getSortedByPointsAndWhitLessThanFiveWords();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const scrapedAndUpdateData = async (req, res, next) => {
    try {
        await hackerNewsModel.deleteAllData();
        const hackerNews = await scrapeHackerNewsService.scrapeHackerNews();
        hackerNews.map(async data => {
            let hackerNewsEntryDoc = new hackerNewsModel({
                rank: data.rank,
                title: data.title,
                points: data.points,
                comments: data.comments,
                wordCount: data.wordCount,
                requestTimestamp: data.requestTimestamp
            })
            await hackerNewsEntryDoc.save();
        })
        res.status(200).json({ message: "Data successfully scraped and saved" });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getAllHackersNews,
    getSortedByCommentsAndWithMoreThanFiveWords,
    getSortedByPointsAndWhitLessThanFiveWords,
    scrapedAndUpdateData
}