import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

// this test is just for first scrape purpose
// describe("POST /scrape", () => {
//     it("should return a 200 status", async () => {
//         const response = await request(app).post("/hackernews/scrape")
//         expect(response.status).to.equal(200);
//     });
// });

describe("GET /hackernews", () => {
    it("should return a 200 status and 30 elements", async () => {
        const response = await request(app).get("/hackernews")
        expect(response.status).to.equal(200);
        expect(response.body).to.have.lengthOf(30);
    });
});

const isSorted = (response, sortBy) => {
    const clone = [...response.body];
    const sortedClone = clone.sort((a,b) => b[sortBy] - a[sortBy])
    return (JSON.stringify(response.body) === JSON.stringify(sortedClone))
}

describe("GET /hackernews/comments", () => {
    it("should return a 200 status, sorted by comments and with wordCount > 5", async () => {
        const response = await request(app).get("/hackernews/comments")
        expect(response.status).to.equal(200);
        expect(isSorted(response, "comments")).to.be.true;
        expect(response.body.every(e => e.wordCount > 5)).to.be.true;
    });
});

describe("GET /hackernews/rank", () => {
    it("should return a 200 status, sorted by points and wordCount <= 5 ", async () => {
        const response = await request(app).get("/hackernews/points");
        expect(response.status).to.equal(200);
        expect(isSorted(response, "points")).to.be.true;
        expect(response.body.every(e => e.wordCount <= 5)).to.be.true;
    });
});
