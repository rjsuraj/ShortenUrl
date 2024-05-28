const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.user;
    if(!user) return res.redirect('/signin');

    const allUrls = await Url.find({ createdBY : user._id});
    res.render('home',{
        urls : allUrls
    })

})

router.get('/signup', (req,res) => {
    res.render('signup');
})

router.get('/signin', (req,res) => {
    res.render('signin');
})

module.exports = router;