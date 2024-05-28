const { getUser } = require("../services/auth");

async function accessToLoggedinUser(req,res,next){
    const userUID = req.cookies?.uid;
    if(!userUID) return res.redirect('/signin');

    const user = getUser(userUID);
    if(!user) return res.redirect('/signin');

    req.user = user;
    next()
}

async function checkAuth(req,res,next){
    const userUID = req.cookies?.uid;
    const user = getUser(userUID);

    req.user = user;
    next();
}

module.exports = {
    accessToLoggedinUser,
    checkAuth
}