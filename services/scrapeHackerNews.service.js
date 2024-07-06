const puppeteer = require("puppeteer");

const scrapeHackerNews = async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");

    const scrapedData = await page.evaluate(() => {
        const tds = document.querySelector("#hnmain > tbody > tr:nth-child(3) > td > table > tbody");
        const tr = tds.querySelectorAll("tr");
        const arrayFromTr = Array.from(tr);
        let hackerNewsEntries = [];

        const getWordCount = (words) => {
            let sanitizedWords = words.split(" ").filter(word => word.match(/[a-z]/ig));
            return sanitizedWords.length;
        }

        const today = Date.now();

        for (i = 0; i < 90; i += 3) {
            let obj = {}
            let rank = arrayFromTr[i].querySelector(".rank");
            rank && (obj.rank = Number(rank.innerText.replace(".", "")));

            let title = arrayFromTr[i].querySelector(".titleline");
            title && (obj.title = title.innerText);

            let points = arrayFromTr[i + 1].querySelector(".score");
            points && (obj.points = Number(points.innerText.split(/\s/)[0]));

            let aElements = arrayFromTr[i + 1].querySelectorAll("a");
            arrayFromAElements = Array.from(aElements);

            let comments = arrayFromAElements[arrayFromAElements.length - 1].innerText.split(/\s/)[0];
            comments && (obj.comments = !isNaN(comments) ? Number(comments) : 0);

            let wordCount = getWordCount(obj.title);
            obj.wordCount = wordCount;

            obj.requestTimestamp = today;

            hackerNewsEntries.push(obj);
        }

        return hackerNewsEntries;
    })
    await browser.close();
    return scrapedData;
}

module.exports = {
    scrapeHackerNews
}