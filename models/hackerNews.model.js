const mongoose = require("../bin/mongodb");
const { Schema } = mongoose;

const HackerNewsSchema = new Schema({
    rank: Number,
    title: String,
    points: Number,
    comments: Number,
    wordCount: Number,
    requestTimestamp: Date
});

HackerNewsSchema.statics.getSortedByCommentsAndWithMoreThanFiveWords = function() {
    return this.find({ wordCount: { $gt: 5 } }).sort({ comments: -1 });
}

HackerNewsSchema.statics.getSortedByPointsAndWhitLessThanFiveWords = function() {
    return this.find({ wordCount: { $lt: 6 } }).sort({ points: -1 });
}

HackerNewsSchema.statics.deleteAllData = async function(){
    try {
        await this.deleteMany({});
        console.log("All Data successfully deleted");
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = mongoose.model("HackerNews", HackerNewsSchema);