const router = require("express").Router();
const {
  Categories,
  Options,
  PollCategories,
  Polls,
  Users,
  Votes,
} = require("../models");
//Import the custom middleware
const withAuth = require("../utils/auth");

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//Routes for additional pages when user is logged in:
router.get('/createpoll', withAuth, (req, res) => {
  res.render('createpoll', {
    logged_in: req.session.logged_in
  });
});
router.get('/pollhistory', withAuth, (req, res) => {
  res.render('pollhistory', {
    logged_in: req.session.logged_in
  });
});
router.get('/browse', withAuth, (req, res) => {
  res.render('browse', {
    logged_in: req.session.logged_in
  });
});
router.get('/contactlist', withAuth, (req, res) => {
  res.render('contactlist', {
    logged_in: req.session.logged_in
  });
});

// This must be last so other APIs are found first
router.get("/", async (req, res) => {
  // Get all polls and JOIN with user data
  const pollData = await Polls.findAll({
    include: [
      {
        model: Users,
      },
    ],
  });
  // Serialize data so the template can read it
  const polls = pollData.map((poll) => poll.get());
      res.render("homepage", {
      polls: polls,
      logged_in: req.session.logged_in,
    });

});
  //console.log('test');

  // Go get all polls to be displayed on the homepage if would like
//   try {
//     res.render("homepage", {
//       polls: polls,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     console.log("error!");
//     res.status(500).json(err);
//   }
// });

module.exports = router;
