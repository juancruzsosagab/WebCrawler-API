# HackerNews Scraping Project

This project implements an API for scraping HackerNews using Node.js, Express, and Mongoose.

## Initial Setup

To start the project, you need to create a `.env` file in the root directory and add the following environment variable:

MONGODB_URI=

The `MONGODB_URI` variable should contain the MongoDB connection URL. This URL can be obtained from the MongoDB documentation, whether for a local or cloud database. The structure of the URL should look like this:

mongodb+srv://{username}:{password}@cluster0.sxeez7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

Note: Replace `{username}` and `{password}` with your own MongoDB credentials.

Once the credentials are added, there is a model that works with Mongoose to create the corresponding collection in the database.

## Project Structure

This project aims to create an API with Express following the MVC model. The logic related to scraping is located in the `services` folder.

The ORM (Mongoose) was used to perform sorting and filtering operations, but manual operations were also performed in the testing to demonstrate both possibilities.

## Available Scripts

To run the project locally:

1. Install dependencies:

   npm install

2. Run the project with nodemon for development:

   npm run dev

3. Run the project in a production-like environment:

   npm start

4. Run the tests:

   npm run test

## Endpoints

### `GET /hackernews`

This endpoint returns HackerNews data. The test for this endpoint verifies that the response status is 200 and contains 30 elements.

### `GET /hackernews/comments`

This endpoint retrieves data sorted by the number of comments and filters those with more than 5 words. The test for this endpoint verifies that the response status is 200, the data is sorted by comments, and each element has more than 5 words.

### `GET /hackernews/points`

This endpoint returns data sorted by points and filters those with a word count of 5 or less. The test for this endpoint verifies that the response status is 200, the data is sorted by points, and each element has 5 words or less.

## Conclusion

This project demonstrates how to implement a basic scraper using Node.js and MongoDB, organizing the code in an MVC model and performing automated tests to ensure the functionality of the API.
