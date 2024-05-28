const express = require("express");
const router = express.Router();

const { handleUserSignUp, handleUserSignIn } = require("../controllers/user")

router.post('/signup', handleUserSignUp);
router.post('/signin', handleUserSignIn);

module.exports = router