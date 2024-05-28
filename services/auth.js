const loginUserMapping = new Map();

function setUser(id, user){
    loginUserMapping.set(id, user);
}

function getUser(id){
   return loginUserMapping.get(id);
}

module.exports = {
    setUser,
    getUser
}