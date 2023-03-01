const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const userDataPlain = userData.get({ plain: true })
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userid = userDataPlain.id;
      req.session.username = req.body.username;
      req.session.relogin = false;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const userDataPlain = userData.get({ plain: true })
    console.log ("req.session.userid:", userDataPlain);

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userid = userDataPlain.id;
      req.session.username = userDataPlain.username;
      req.session.relogin = false;

      
      res
        .status(200)
        .json({ user: userDataPlain, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

// Logout
router.get('/idle-logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.relogin = true;
    req.session.loggedIn = false;
    res.redirect('/login');

  } else {
    res.redirect('/login');
  }
});





//idle timeout
router.post('/idle-timeout', (req, res) => {
  req.session.relogin = true;
  res.status(200).end();
});





module.exports = router;
