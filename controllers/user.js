const User = require("../models/user");
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

    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserSignIn
}