const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Tweet = require("../models/Tweet");
const { body, validationResult } = require("express-validator");

// Route 1: Fetch all tweets belong to a user using POST "/api/tweets/fetchalltweets".
// Login required.
router.get("/fetchalltweets", fetchuser, async (req, res) => {
  try {
    const tweets = await Tweet.find({ user: req.user.id });
    res.send(tweets);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/fetchFollowerstweets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tweets = await Tweet.find({ user: id });
    res.send(tweets);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 2: Add a tweet to a signed user using POST "/api/tweets/addtweet" belong to user which is already signed in.
// Login required.
router.post(
  "/addtweet",
  fetchuser,
  [body("title").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { title, tag } = req.body;

      // if there are validation errors, return bad request and the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tweet = await Tweet.create({
        title,
        tag,
        user: req.user.id,
      });
      res.send(tweet);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Update a existing tweet using PUT "/api/tweets/updatetweet".
// Login required.
router.put("/updatetweet/:id", fetchuser, async (req, res) => {
  try {
    const { title, tag } = req.body;

    let newTweet = {};
    if (title) {
      newTweet.title = title;
    }
    // TODO -> add image

    if (tag) {
      newTweet.tag = tag;
    }

    // Find the tweet to be updated and update it.
    let tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).send("Not Found");
    }

    // Allow updation only if tweet belong to signed user.
    if (tweet.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    tweet = await Tweet.findByIdAndUpdate(
      req.params.id,
      { $set: newTweet },
      { new: true }
    );
    res.json({ tweet });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 4: Delete a existing tweet using DELETE "/api/tweets/deletetweet".
// Login required.
router.delete("/deletetweet/:id", fetchuser, async (req, res) => {
  try {
    // Find the tweet to be deleted and delete it.
    let tweet = await tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if tweet belong to signed user.
    if (tweet.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    tweet = await Tweet.findByIdAndDelete(req.params.id);
    res.json({ Success: "Tweet has been deleted", tweet });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
