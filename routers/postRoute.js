const express = require("express");
const post_route = express.Router();  // Create an Express Router instance
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");

post_route.use(bodyparser.json());
post_route.use(bodyparser.urlencoded({extended:true}));

post_route.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/postImages"));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

const post_controllers = require("../controllers/postController");

post_route.post("/post-route", upload.single("image"), post_controllers.post_creat);

module.exports = post_route;  // Export the router instance