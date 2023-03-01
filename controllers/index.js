const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const postNowRoutes = require('./post-now-routes.js');
const postDetailRoutes = require('./post-detail-routes.js');
const postCommentRoutes = require('./post-comment-routes.js');


router.use('/', homeRoutes);

router.use('/dashboard', dashboardRoutes);

router.use('/postnow', postNowRoutes);
router.use('/post', postDetailRoutes);
router.use('/post-comment', postCommentRoutes);
router.use('/api', apiRoutes);

module.exports = router;
