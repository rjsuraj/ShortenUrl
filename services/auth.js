const jwt = require("jsonwebtoken");
const SECRET = "abcd"

function setUser(user){

   const token = jwt.sign({
       _id : user._id,
       email : user.email
   },SECRET)
   return token;
}

function getUser(token){
    
    if(!token) return null;
    const user = jwt.verify(token,SECRET);
    return user;
}

module.exports = {
    setUser,
    getUser
}