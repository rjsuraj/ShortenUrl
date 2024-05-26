const Url = require("../models/url");
const crypto = require("crypto");

async function handleGenerateShortUrl(req,res){
    const shortId = crypto.randomUUID().slice(0,6);   
    const body = req.body;

    if(!body.url) return res.json({ error : "url is required."});

    await Url.create({
        shortId,
        redirectUrl : body.url,
        visitHistory : []
    })

    const allUrls = await Url.find({});

    return res.render('home', {
        urls : allUrls
    })
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const entry = await Url.findOne(
        { shortId }
    )

    res.json({
        totalClicks : entry.visitHistory.length,
        analytics : entry.visitHistory
    });
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics
}