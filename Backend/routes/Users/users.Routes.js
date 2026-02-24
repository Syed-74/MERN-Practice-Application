const express = require("express");
const { register, login, getProfile } = require("../../controllers/Users/users.Controllers");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.get("/Profile/:id",isLoggedIn,getProfile); 

module.exports = router;
