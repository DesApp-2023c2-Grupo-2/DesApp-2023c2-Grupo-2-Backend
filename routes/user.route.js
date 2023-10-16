const express = require("express");
const {
  getUsers,
  getUserById,
  getUser,
  updateUserById,
  deleteUserById,
  getFullname
} = require("../controllers/user.controller");
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt')

router.get("/getAll", getUsers);
router.get("/getOne/:id", getUserById);
router.get("/", getUser);
router.patch("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);
router.get("/fullname", verifyJwt, getFullname);

module.exports = router;
