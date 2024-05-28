const User = require("../models/user");
const crypto = require("crypto");
const { setUser } = require("../services/auth")

async function handleUserSignUp(req,res){
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect('/signin');
}

async function handleUserSignIn(req,res){
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if(!user) return res.redirect('/signin');

    const sessionId = crypto.randomUUID();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserSignIn
}