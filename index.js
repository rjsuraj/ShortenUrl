const express = require("express");
const path  = require("path");
const { connectMongoDb } = require("./connect");

// connection
connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDb connected")
);

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const Url = require("./models/url");

const app = express();
const PORT = 8001;

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// routes
app.use('/url',urlRoute)
app.use('/',staticRoute)

app.get('/url/:shortId', async (req,res) => {
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate(
        { shortId },
        {
            $push : {
                visitHistory : { timeStamp : Date.now() }
            }
        }
    )

    res.redirect(entry.redirectUrl);
})


app.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`);
});
